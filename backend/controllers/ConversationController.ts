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
    const _user = req.user;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        res
          .status(404)
          .json({ status: "error", data: "User doest not exists" });
        return;
      }
      const conversations = await ConversationModel.aggregate([
        {
          $match: {
            $or: [{ _id: { $in: user.conversations } }, { is_private: false }],
          },
        },
        {
          $lookup: {
            from: "users",
            let: { conv_id: "$_id", isChannel: "$is_channel" },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $eq: ["$$isChannel", false] } },
                    { $expr: { $in: ["$$conv_id", "$conversations"] } },
                    { $expr: { $ne: ["$_id", _user._id] } },
                  ],
                },
              },
              {
                $group: {
                  _id: "$_id",
                },
              },
            ],
            as: "user",
          },
        },
      ])
        .sort({ name: 1 })
        .exec();
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
      const destId = req.body.id;
      // If body have id the it will be NOT channel and have only 2 members
      if (!isValidObjectId(destId)) {
        res.status(403).json({
          status: "error",
          data: "That ID is not correct.",
        });
        return;
      }
      // Check if channel name already taken
      if (isChannelExist) {
        res.status(403).json({
          status: "error",
          data: "That name is already taken by a channel.",
        });
        return;
      } else {
        // Check if Direct message already exist
        const isDMExist = await ConversationModel.findOne({
          _id: { $in: user.conversations },
          is_channel: false,
        });
        // If Direct message exist redirect to that DM ID
        if (isDMExist) {
          res.status(409).redirect(isDMExist._id.toString());
        } else {
          // If no channel and no dm create it
          const postData = {
            name: req.body.name,
            is_channel: req.body.isChannel,
            creator: req.userId,
            purpose: req.body.purpose,
            topic: req.body.topic,
            is_private: (destId && true) || req.body.isPrivate,
            num_members: req.body.isChannel ? 1 : 2,
            unread_count: 0,
          };
          const conversation = await new ConversationModel(postData).save();
          await UserModel.updateOne(
            { _id: user._id },
            { $addToSet: { conversations: conversation._id } }
          );
          this.io.emit("SERVER:CONVERSATION_CREATED");
          res.json({ status: "success", data: conversation });
        }
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
          data: "That name is already taken by a channel, username, or user group.",
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
      console.log("Error on ConversationController / update:", error);
    }
  };
}

export default ConversationController;
