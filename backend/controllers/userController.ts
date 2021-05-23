import express from "express";
import { isValidObjectId } from "mongoose";
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

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;
      if (!isValidObjectId(userId)) {
        res.status(400).json({ status: "error", message: "Wrong type of ID" });
      } else {
        const user = await UserModel.findById(userId).exec();
        if (!user) {
          res.status(404).json({ status: "error", message: "User not found" });
        } else {
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
      console.log("Error on UserController / show:", error);
    }
  }

  async showByNameOrEmail(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const userId = req.userId;
      const query = req.params.query;
      const users = await UserModel.find({
        _id: {$ne: userId},
        $or: [{ name: query }, { email: query }],
      }).exec();
      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on UserController / showByNameOrEmail:", error);
    }
  }
}

export default UserController;
