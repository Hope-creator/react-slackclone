import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { mongoose } from "../core/db";
import { ConversationModel } from "../models/ConversationModel";
import { DialogModel } from "../models/DialogModel";
import { MessageModel } from "../models/MessageModel";
import { getAggregateMessage } from "../utils/function/getAggregateMessage";

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
    try {
      const messages = await getAggregateMessage(
        { unreadBy: mongoose.Types.ObjectId(userId) },
        userId
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
    const dialogId = req.params.id;
    if (!isValidObjectId(dialogId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const dialog = await DialogModel.exists({
          _id: dialogId,
        });
        if (!dialog) {
          res
            .status(400)
            .json({ status: "error", data: "Dialog doesn't exist" });
        } else {
          const count = await MessageModel.countDocuments({
            dest: dialogId,
            unreadBy: req.user._id,
          });
          res.json({ status: "success", data: count });
        }
      } catch (error) {
        res.status(500).json({
          status: "error",
          errors: JSON.stringify(error),
        });
        console.log("Error on MessagesController / index:", error);
      }
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
          this.io.to(userId).emit("SERVER:READ_ALL_CONVERSATION", conversation);
        } else {
          this.io.to(userId).emit("SERVER:READ_ALL");
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
        message && this.io.to(userId).emit("SERVER:READ_ONE", message.dest);
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
