import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { ConversationModel } from "../models/ConversationModel";
import { MessageModel } from "../models/MessageModel";
import { UserModel } from "../models/UserModel";
import { getAggregateMessage } from "../utils/function/getAggregateMessage";

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
          const messages = await getAggregateMessage(
            { dest: conversation._id },
            user._id
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
}

export default MessagesController;
