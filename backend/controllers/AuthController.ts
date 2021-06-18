import express from "express";
import { validationResult } from "express-validator/src/validation-result";
import { sendEmail } from "../core/mailer";
import { CodeModel } from "../models/SecretCodeModel";
import { UserModel } from "../models/UserModel";
import { hashText, promisifyCompare } from "../utils/bcrypt";
import cryptoRandomString from "crypto-random-string";
import { tokenCreate } from "../utils/tokenCreate";
import { CompanyModel } from "../models/CompanyModel";
import { DialogModel } from "../models/DialogModel";
import socket from "socket.io";

class AuthController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", errors: errors.array() });
        return;
      }

      const { name, email, password } = req.body as {
        name: string;
        email: string;
        password: string;
      };
      const hashedPw = await hashText(password);
      const newUser = new UserModel({
        name,
        email,
        password: hashedPw,
      });
      const user = await newUser.save();
      const token = tokenCreate(user._id);
      req.session.token = token;
      const baseUrl = req.protocol + "://" + req.get("host");
      const secretCode = cryptoRandomString(6);
      const newCode = new CodeModel({
        email: email,
        code: secretCode,
      });
      await newCode.save();

      // Adding user to company members
      const company = await CompanyModel.findOneAndUpdate(
        { _id: "T01TE7T5WEV" },
        { $addToSet: { members: user._id } },
        { new: true }
      );
      const savedUser = await UserModel.findById(user._id).populate("company");
      if (!company) {
        res.status(404).json({ status: "error", data: "Company not found" });
        return;
      }
      /*
       * On registration creating dialogs with all existing members
       */
      const allUsersDialogData = company.members.map((memberId) => {
        const dialog = { creator: user._id, partner: memberId };
        return dialog;
      });
      await DialogModel.insertMany(allUsersDialogData);

      this.io.emit("SERVER:DIALOG_CREATED");

      await sendEmail({
        email: email,
        baseUrl: baseUrl,
        userId: user._id,
        secretCode: secretCode,
        callback: (err: Error | null) => {
          if (err) {
            console.log(err);
            res.status(500).json({ status: "error" });
          } else {
            res.json({
              status: "success",
              data: savedUser,
            });
          }
        },
      });
    } catch (error) {
      if (error.message === "Email must be unique") {
        res.status(409).json({
          status: "error",
          errors: error.message,
        });
      } else {
        UserModel.remove({ email: req.body.email });
        res.status(500).json({
          status: "error",
          errors: JSON.stringify(error),
        });
        console.log("Error on AuthController / create:", error);
      }
    }
  };

  verify = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const user = await UserModel.findById(req.params.userId);
      if (!user) {
        res.status(401).json({ status: "error", error: "User not found" });
      } else {
        const code = await CodeModel.findOne({
          email: user.email,
          code: req.params.secretCode,
        });
        if (!code) {
          res.status(401).json({ status: "error", error: "Wrong code" });
        } else {
          await UserModel.updateOne(
            { email: user.email },
            { status: "active" }
          );
          await CodeModel.deleteMany({ email: user.email });
          const redirectPath = `${req.protocol}://${req.get("host")}/verified`;
          res.redirect(redirectPath);
        }
      }
    } catch (error) {
      console.log("Error on AuthController / verify:", error);
      res.status(500).json({
        status: "error",
        error: JSON.stringify(error),
      });
    }
  };

  login = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", data: errors.array() });
        return;
      }

      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      const user = await UserModel.findOne({ email: email })
        .select("+password")
        .populate("company");
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "Email or password do not match.",
        });
      } else {
        const pwCheckSuccess = await promisifyCompare(password, user.password);
        if (!pwCheckSuccess) {
          res.status(400).json({
            status: "error",
            message: "Email or password do not match.",
          });
        } else {
          const token = tokenCreate(user._id);
          req.session.token = token;
          res.json({
            status: "success",
            data: user,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on AuthController / login:", error);
    }
  };

  getMe = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const userId = req.user._id;
      const user = await UserModel.findById(userId).populate("company");
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        data: JSON.stringify(error),
      });
      console.log("Error on AuthController / getMe:", error);
    }
  };
}

export default AuthController;
