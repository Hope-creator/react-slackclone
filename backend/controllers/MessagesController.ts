import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { mongoose } from "../core/db";
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
            const query = await MessageModel.aggregate([
              { $match: { dest: conversation._id } },
              {
                $addFields: {
                  marked: {
                    $in: [mongoose.Types.ObjectId(userId), "$markedBy"],
                  },
                },
              },

              {
                $lookup: {
                  from: "users",
                  localField: "creator",
                  foreignField: "_id",
                  as: "creator",
                },
              },
              { $unwind: "$creator" },
              {
                $lookup: {
                  from: "files",
                  localField: "attachments",
                  foreignField: "_id",
                  as: "attachments",
                },
              },
              {
                $project: {
                  markedBy: 0,
                  creator: { password: 0, status: 0 },
                },
              },
            ]);
            res.json({ status: "success", data: query });
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
          const count = await MessageModel.countDocuments({
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

  getUnread = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    try {
      const messages = await MessageModel.aggregate([
        { $match: { unreadBy: mongoose.Types.ObjectId(userId) } },
        {
          $addFields: {
            marked: {
              $in: [mongoose.Types.ObjectId(userId), "$markedBy"],
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "creator",
            foreignField: "_id",
            as: "creator",
          },
        },
        { $unwind: "$creator" },
        {
          $lookup: {
            from: "files",
            localField: "attachments",
            foreignField: "_id",
            as: "attachments",
          },
        },
        {
          $project: {
            markedBy: 0,
            creator: { password: 0, status: 0 },
          },
        },
      ]);
      res.json({ status: "success", data: messages });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on MessagesController / index:", error);
    }
  };

  readAll = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    try {
      await MessageModel.updateMany(
        { unreadBy: userId },
        { $pull: { unreadBy: userId } }
      );
      res.json({ status: "success", data: true });
    } catch (error) {
      res.status(500).json({
        status: "error",
        data: false,
      });
      console.log("Error on MessagesController / index:", error);
    }
  };

  readOneByMessageId = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
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
          message && this.io.to(userId).emit("SERVER:READ_ONE", message.dest)
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

  readAllByConversationId = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    const convId = req.body.conversationId;
    try {
      await MessageModel.updateMany({ unreadBy: userId, dest: convId });
      res.json({ status: "success", data: true });
    } catch (error) {
      res.status(500).json({
        status: "error",
        data: false,
      });
      console.log("Error on MessagesController / index:", error);
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
          const data = await new MessageModel(postData).save();
          const aggregateArr = await MessageModel.aggregate([
            { $match: { _id: data._id } },
            {
              $addFields: {
                marked: {
                  $in: [mongoose.Types.ObjectId(userId), "$markedBy"],
                },
              },
            },

            {
              $lookup: {
                from: "users",
                localField: "creator",
                foreignField: "_id",
                as: "creator",
              },
            },
            { $unwind: "$creator" },
            {
              $lookup: {
                from: "files",
                localField: "attachments",
                foreignField: "_id",
                as: "attachments",
              },
            },
            {
              $project: {
                markedBy: 0,
                creator: { password: 0, status: 0 },
              },
            },
          ]).exec();
          const message = aggregateArr[0];
          this.io
            .to(message.dest.toString())
            .emit("SERVER:NEW_MESSAGE", message);
          if (!conversation.is_channel)
            this.io
              .to(
                conversation.members
                  .filter(
                    (_userId) => _userId.toString() !== userId.toString()
                  )[0]
                  .toString()
              )
              .emit("SERVER:NEW_UNREAD", message);
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
