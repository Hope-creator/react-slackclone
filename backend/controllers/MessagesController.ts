import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { ConversationModel } from "../models/ConversationModel";
import { MarkedMessageModel } from "../models/MarkedMessageModel";
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
        }).exec();
        if (!conversation) {
          res
            .status(400)
            .json({ status: "error", data: "Conversations doesn't exist" });
        } else {
          if (
            (conversation.is_private &&
              conversation.members.includes(userId)) ||
            !conversation.is_private
          ) {
            const query = await MessageModel.find({
              dest: conversation._id,
            })
              .populate("creator")
              .populate("attachments")
              .lean();
            const messages = await Promise.all(
              query.map(async (message) => {
                const isMarked = await MarkedMessageModel.exists({
                  user: userId,
                  markedMessage: message._id,
                });
                if (isMarked) {
                  message.marked = true;
                } else {
                  message.marked = false;
                }
                return message;
              })
            );
            res.json({ status: "success", data: messages });
          } else {
            res
              .status(404)
              .json({ status: "error", data: "Conversation not founded" });
          }
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

  getUnreadCountById = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const conversationsId = req.params.id;
    if (!isValidObjectId(conversationsId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const conversation = await ConversationModel.exists({
          _id: conversationsId,
        });
        if (!conversation) {
          res
            .status(400)
            .json({ status: "error", data: "Conversations doesn't exist" });
        } else {
          const count = await MessageModel.count({
            dest: conversationsId,
            unreadBy: req.userId,
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
            dest: conversation.id,
            text: req.body.text,
            unreadBy:
              (!conversation.is_channel &&
                conversation.members.filter(
                  (_userId) => _userId.toString() !== userId.toString()
                )) ||
              undefined,
            attachments: req.body.attachments,
          };
          const message = await (await new MessageModel(postData).save())
            .populate("creator")
            .populate("attachments")
            .execPopulate();
          this.io
            .to(message.dest.toString())
            .emit("SERVER:NEW_MESSAGE", message);
          if (!conversation.is_channel)
            this.io.emit("SERVER:NEW_UNREAD", conversation._id);
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
