import express from "express";
import { UserModel } from "../models/UserModel";

class UserController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();
      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on UserController / index:", error);
    }
  }
}

export const UserCtrl = new UserController();
