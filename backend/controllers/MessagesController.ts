import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { ConversationModel } from "../models/ConversationModel";
import { MessageModel } from "../models/MessageModel";

class MessagesController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    const conversationsId = req.params.id;
    if (!isValidObjectId(conversationsId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const conversation = await ConversationModel.findOne({
          _id: conversationsId,
          members: userId,
        }).exec();
        if (!conversation) {
          res
            .status(400)
            .json({ status: "error", data: "Conversations doesn't exist" });
        } else {
          const messages = await MessageModel.find({ dest: conversation._id })
            .populate("creator");
          res.json({ status: "success", data: messages });
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

  /*export interface IMessage {
    creator: IUser | string;
    dest: IConversation | string;
    text: string;
    read: boolean;
  }*/

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    const conversationsId = req.params.id;
    if (!isValidObjectId(conversationsId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const conversation = await ConversationModel.findOne({
          _id: conversationsId,
          members: userId,
        }).exec();
        if (!conversation) {
          res
            .status(400)
            .json({ status: "error", data: "Conversations doesn't exist" });
        } else {
          const postData = {
            creator: req.userId,
            dest: req.params.id,
            text: req.body.text,
            read: false,
          };
          const message = await (await new MessageModel(postData).save())
            .populate("creator")
            .execPopulate();
          res.json({ status: "success", data: message });
        }
      } catch (error) {
        res.status(500).json({
          status: "error",
          errors: JSON.stringify(error),
        });
        console.log("Error on MessagesController / create:", error);
      }
    }
  };
}

export default MessagesController;
