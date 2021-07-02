import express from "express";
import { isValidObjectId, Schema } from "mongoose";
import socket from "socket.io";
import { ConversationModel } from "../models/ConversationModel";
import { FileModel } from "../models/FileModel";
import { MessageModel } from "../models/MessageModel";
import { UserModel } from "../models/UserModel";
import { getAggregateMessage } from "../utils/function/getAggregateMessage";
import { getAggregateMessageWithPagination } from "../utils/function/getAggregateMessageWithPagination";

class MessagesController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const conversationsId = req.params.id;
    const { page = 1, count = 40 } = req.query;
    const skipPage = page > 0 ? (Number(page) - 1) * Number(count) : 0;
    if (!isValidObjectId(conversationsId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const conversation = await ConversationModel.findOne({
          _id: conversationsId,
        }).exec();
        if (!conversation) {
          res
            .status(400)
            .json({ status: "error", data: "Conversations doesn't exist" });
          return;
        }
        if (
          (conversation.is_private &&
            user.conversations.includes(conversation._id)) ||
          !conversation.is_private
        ) {
          const messages = await getAggregateMessageWithPagination(
            { dest: conversation._id },
            user._id,
            skipPage,
            Number(count)
          );
          res.json({ status: "success", data: messages });
        } else {
          res
            .status(404)
            .json({ status: "error", data: "Conversation not founded" });
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

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const conversationsId = req.params.id;
    if (!isValidObjectId(conversationsId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
      return;
    }
    try {
      const conversation = await ConversationModel.findOne({
        $and: [{ _id: conversationsId }, { _id: { $in: user.conversations } }],
      }).exec();
      if (!conversation) {
        res
          .status(400)
          .json({ status: "error", data: "Conversations doesn't exist" });
      } else {
        const postData = {
          creator: req.userId,
          dest: conversation.id,
          text: req.body.text,
          attachments: req.body.attachments,
        };
        const data = await new MessageModel(postData).save();
        const aggregateArr = await getAggregateMessage(
          { _id: data._id },
          user._id
        );
        const message = aggregateArr[0];
        this.io.to(message.dest.toString()).emit("SERVER:NEW_MESSAGE", message);
        res.json({ status: "success", data: message });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on MessagesController / create:", error);
    }
  };

  delete = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const messageId = req.body.messageId;
    if (!isValidObjectId(messageId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
      return;
    }
    try {
      const message = await MessageModel.findOneAndDelete({
        $and: [{ _id: messageId }, { creator: user._id }],
      }).exec();
      if (!message) {
        res
          .status(400)
          .json({ status: "error", data: "Message doesn't exist" });
      } else {
        message.attachments.length > 0 &&
          Promise.all(
            message.attachments.map(
              async (file: any) => await FileModel.deleteOne({ _id: file })
            )
          );
        const userDest = await UserModel.findById(message.dest);
        if (userDest) {
          message.unreadBy.length > 0 &&
            this.io.to(message.unreadBy[0].toString()).emit("SERVER:READ_ONE");
          this.io
            .to([message.dest.toString(), message.creator.toString()])
            .emit("SERVER:MESSAGE_DELETED", messageId);
          res.json({ status: "success", data: message });
        } else {
          const convDest = await ConversationModel.findById(message.dest);
          if (convDest) {
            const users = [
              user._id.toString(),
              ...(
                await UserModel.find({
                  conversations: convDest._id,
                }).distinct("_id")
              ).map((id) => id.toString()),
            ];
            this.io.to(users).emit("SERVER:MESSAGE_DELETED", messageId);
            res.json({ status: "success", data: message });
            return;
          }
          res.status(500).json({
            status: "error",
            errors: "Something went wrong",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on MessagesController / delete:", error);
    }
  };
}

export default MessagesController;
