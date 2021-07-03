import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { ConversationModel } from "../models/ConversationModel";
import { UserModel } from "../models/UserModel";
import { getConversationUsers } from "../utils/function/getConversationUsers";

class ConversationController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const { page = 1, count = 10, search } = req.query;
    const skipPage = page > 0 ? (Number(page) - 1) * Number(count) : 0;
    try {
      const searchQuery =
        typeof search === "string"
          ? search.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&")
          : undefined;
      const matchQuery = searchQuery
        ? {
            $match: {
              name: { $regex: searchQuery, $options: "i" },
              $or: [
                { _id: { $in: user.conversations } },
                { is_private: false },
              ],
            },
          }
        : {
            $match: {
              $or: [
                { _id: { $in: user.conversations } },
                { is_private: false },
              ],
            },
          };
      const conversations = (
        await ConversationModel.aggregate([
          matchQuery,
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $facet: {
              results: [{ $skip: skipPage }, { $limit: Number(count) }],
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
        ]).exec()
      )[0];
      res.json({ status: "success", data: conversations });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / index:", error);
    }
  };

  show = async (req: express.Request, res: express.Response): Promise<void> => {
    const userId = req.userId;
    const conversationId = req.params.id;
    if (!isValidObjectId(conversationId)) {
      res.status(403).json({
        status: "error",
        data: "Wrong type of conversation ID",
      });
      return;
    }
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        res
          .status(404)
          .json({ status: "error", data: "User doest not exists" });
        return;
      }
      const conversation = await ConversationModel.findOne({
        _id: conversationId,
        $or: [{ _id: { $in: user.conversations } }, { is_private: false }],
      }).exec();
      res.json({ status: "success", data: conversation });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / show:", error);
    }
  };

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const user = req.user;
      const isChannelExist = await ConversationModel.exists({
        name: req.body.name,
      });
      // Check if channel name already taken
      if (isChannelExist) {
        res.status(403).json({
          status: "error",
          data: "That name is already taken by a channel.",
        });
        return;
      }
      const postData = {
        name: req.body.name,
        is_channel: req.body.isChannel,
        creator: req.userId,
        purpose: req.body.purpose,
        topic: req.body.topic,
        is_private: req.body.isPrivate,
        num_members: 1,
        unread_count: 0,
      };
      const conversation = await new ConversationModel(postData).save();
      await UserModel.updateOne(
        { _id: user._id },
        { $addToSet: { conversations: conversation._id } }
      );
      // if conversation private client update conversations
      // by add conversation from res.data
      // else conversation will be added from socket handler
      !conversation.is_private &&
        this.io.emit("SERVER:CONVERSATION_CREATED", conversation);
      res.json({ status: "success", data: conversation });
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
      const user = req.user;
      const conversationId = req.body.id;
      const postData = {
        name: req.body.name,
        description: req.body.description,
        topic: req.body.topic,
        is_private: req.body.is_private,
      };
      if (!user.conversations.includes(conversationId)) {
        res.status(403).json({
          status: "error",
          data: "Not in channel.",
        });
        return;
      }
      const isNameConvExist = await ConversationModel.findOne({
        name: postData.name,
      });
      if (postData.name === "") {
        res.status(403).json({
          status: "error",
          data: "Name cannot be empty string.",
        });
        return;
      }
      if (isNameConvExist) {
        res.status(403).json({
          status: "error",
          data: "That name is already taken by a channel.",
        });
      } else {
        const conversation = await ConversationModel.findByIdAndUpdate(
          conversationId,
          postData,
          { new: true, omitUndefined: true }
        ).exec();
        if (!conversation) {
          res.status(404).json({
            status: "error",
            data: "Channel doesn't exists or you don't have right to do this",
          });
          return;
        }
        if(conversation.is_private) {
          const users = await getConversationUsers(conversation._id);
          this.io.to(users).emit("SERVER:CONVERSATION_UPDATE", conversation);
        } else {
          this.io.emit("SERVER:CONVERSATION_UPDATE", conversation);
        }
        res.json({ status: "success", conversation });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / update:", error);
    }
  };
}

export default ConversationController;
