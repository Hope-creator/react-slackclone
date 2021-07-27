import express from "express";
import { validationResult } from "express-validator/src/validation-result";
import { sendEmail } from "../core/mailer";
import { CodeModel } from "../models/SecretCodeModel";
import { UserModel } from "../models/UserModel";
import { hashText, promisifyCompare } from "../utils/bcrypt";
import cryptoRandomString from "crypto-random-string";
import { tokenCreate } from "../utils/tokenCreate";
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
      if (req.session) req.session.token = token;
      const baseUrl = req.protocol + "://" + req.get("host");
      const secretCode = cryptoRandomString(6);
      const newCode = new CodeModel({
        email: email,
        code: secretCode,
      });
      await newCode.save();
      const savedUser = await UserModel.findById(user._id).populate("company");

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
            this.io.emit("SERVER:NEW_USER", savedUser);
            res.json({
              status: "success",
              data: savedUser,
            });
          }
        },
      });
    } catch (error: any) {
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

      const user = await UserModel.findOneAndUpdate(
        { email: email },
        { online: true },
        { new: true }
      )
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
          if (req.session) req.session.token = token;
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

  update = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const user = req.user;
      const { name, display_name, work, phone, away, avatar } = req.body;

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        {
          name: name,
          display_name: display_name,
          work: work,
          phone: phone,
          away: away,
          avatar: avatar,
        },
        {
          new: true,
          omitUndefined: true,
          runValidators: true
        }
      ).populate("company");

      res.json({
        status: "success",
        data: updatedUser,
      });
      this.io.emit("SERVER:UPDATE_USER", updatedUser);
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
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { online: true },
        { new: true }
      ).populate("company");
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

  delete = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      req.session = null;
      res.cookie("session", null);
      res.json({ status: "success", data: true });
    } catch (error) {
      res.status(500).json({
        status: "error",
        data: JSON.stringify(error),
      });
      console.log("Error on AuthController / delete:", error);
    }
  };
}

export default AuthController;
