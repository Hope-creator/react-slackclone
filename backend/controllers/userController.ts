import express from "express";
import { isValidObjectId } from "mongoose";
import { UserModel } from "../models/UserModel";

class UserController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    const { page = 1, count = 20, search } = req.query;
    const skipPage = page > 0 ? (Number(page) - 1) * Number(count) : 0;

    const searhQuery =
      search && typeof search === "string"
        ? {
            name: {
              $regex: search.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&"),
              $options: "i",
            },
          }
        : {};
    try {
      const users = (
        await UserModel.aggregate([
          {
            $match: searhQuery,
          },
          { $sort: { createdAt: -1 } },
          {
            $facet: {
              results: [
                { $skip: skipPage },
                { $limit: Number(count) },
                {
                  $project: {
                    status: 0,
                    password: 0,
                  },
                },
              ],
              totalCount: [
                {
                  $count: "total",
                },
              ],
            },
          },
          {
            $addFields: {
              totalCount: {
                $arrayElemAt: ["$totalCount.total", 0],
              },
            },
          },
        ])
      )[0];
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
}

export default UserController;
