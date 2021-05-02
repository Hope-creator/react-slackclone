import express from "express";
import { validationResult } from "express-validator/src/validation-result";
import { sendEmail } from "../core/mailer";
import { CodeModel } from "../models/SecretCodeModel";
import { UserModel } from "../models/UserModel";
import { hashText, promisifyCompare } from "../utils/bcrypt";
import cryptoRandomString from "crypto-random-string";
import { tokenCreate } from "../utils/tokenCreate";

class AuthController {
  async create(req: express.Request, res: express.Response): Promise<void> {
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
              data: user,
            });
          }
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on UserController / create:", error);
    }
  }

  async verify(req: express.Request, res: express.Response): Promise<void> {
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
  }

  async login(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", errors: errors.array() });
        return;
      }

      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      const user = await UserModel.findOne({ email: email }).select("+password");
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
  }
}

export const AuthCtrl = new AuthController();
