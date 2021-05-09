import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { ConversationModel } from "../models/ConversationModel";
import { UserModel } from "../models/UserModel";

/*
  name: string;
  is_channel?: boolean;
  created: Date;
  creator?: Schema.Types.ObjectId;
  purpose?: IPurpose;
  topic?: ITopic;
  messages: IMessage[];
  is_private: boolean;
  members: IUser[] | never[] | string;
  num_members: number;
  unread_count: number;
  */

class ConversationController {
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
      const conversations = await ConversationModel.find({
        members: userId,
      }).exec();
      res.json({ status: "success", data: conversations });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / index:", error);
    }
  };

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const userId = req.userId;
      const postData = {
        name: req.body.name,
        is_channel: req.body.isChannel,
        creator: req.userId,
        purpose: req.body.purpose,
        topic: req.body.topic,
        is_private: req.body.isPrivate,
        members: [userId],
        num_members: 1,
        unread_count: 0,
      };
      const isConversationExist = await ConversationModel.findOne(
        postData.name
      );
      if (isConversationExist) {
        res.status(403).json({
          status: "error",
          data:
            "That name is already taken by a channel, username, or user group.",
        });
      } else {
        const conversationRaw = new ConversationModel(postData);
        const conversation = await conversationRaw.save();
        this.io.emit("SERVER:CONVERSATION_CREATED", {
          conversation,
        });
        res.json({ status: "success", conversation });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / create:", error);
    }
  };

  update = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const conversationId = req.body._id;
      const postData = {
        name: req.body.name,
        purpose: req.body.purpose,
        topic: req.body.topic,
        is_private: req.body.isPrivate,
      };
      const isNameExist =
        (await ConversationModel.findOne(postData.name)) ||
        UserModel.findOne(postData.name);
      if (isNameExist) {
        res.status(403).json({
          status: "error",
          data:
            "That name is already taken by a channel, username, or user group.",
        });
      } else {
        const conversation = await ConversationModel.findByIdAndUpdate(
          conversationId,
          postData,
          { new: true }
        ).exec();
        res.json({ status: "success", conversation });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / create:", error);
    }
  };
}

export default ConversationController;