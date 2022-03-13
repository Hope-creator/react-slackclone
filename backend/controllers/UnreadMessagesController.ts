import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { mongoose } from "../core/db";
import { ConversationModel } from "../models/ConversationModel";
import { MessageModel } from "../models/MessageModel";
import { UserModel } from "../models/UserModel";
import { getAggregateMessageWithPagination } from "../utils/function/getAggregateMessageWithPagination";

class UnreadMessagesController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    const { page = 1, count = 20 } = req.query;
    const skipPage = page > 0 ? (Number(page) - 1) * Number(count) : 0;
    try {
      const messages = await getAggregateMessageWithPagination(
        { unreadBy: new mongoose.Types.ObjectId(userId) },
        userId,
        skipPage,
        Number(count)
      );
      res.json({ status: "success", data: messages });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on MessagesController / index:", error);
    }
  };

  count = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    try {
      const count = await MessageModel.countDocuments({
        unreadBy: user._id,
      });
      res.json({ status: "success", data: count });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on MessagesController / index:", error);
    }
  };

  delete = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.user._id;
    const conversation = req.query.conversation;
    if (conversation && !isValidObjectId(conversation)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const query = conversation
          ? {
            unreadBy: userId,
            dest: { $eq: conversation as string },
          }
          : {
            unreadBy: userId,
          };
        await MessageModel.updateMany(
          query,
          { $pull: { unreadBy: userId } },
          { new: true }
        );
        if (conversation) {
          this.io
            .to(userId.toString())
            .emit("SERVER:READ_ALL_CONVERSATION", conversation);
        } else {
          this.io.to(userId.toString()).emit("SERVER:READ_ALL");
        }
        res.json({ status: "success", data: true });
      } catch (error) {
        res.status(500).json({
          status: "error",
          data: false,
        });
        console.log("Error on MessagesController / index:", error);
      }
    }
  };

  deleteOne = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.user._id;
    const messageId = req.body.messageId;
    if (!isValidObjectId(messageId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const message = await MessageModel.findByIdAndUpdate(
          { _id: messageId },
          { $pull: { unreadBy: userId } },
          { new: true }
        )
          .populate("creator")
          .exec();
        message && this.io.to(userId.toString()).emit("SERVER:READ_ONE");
        res.json({ status: "success", data: true });
      } catch (error) {
        res.status(500).json({
          status: "error",
          data: false,
        });
        console.log("Error on MessagesController / index:", error);
      }
    }
  };
}

export default UnreadMessagesController;
