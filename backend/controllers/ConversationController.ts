import express from "express";
import { isValidObjectId } from "mongoose";
import { constants } from "node:crypto";
import socket from "socket.io";
import { CompanyModel } from "../models/CompanyModel";
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
        $or: [{ members: userId }, { is_private: false }],
      })
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
    try {
      const conversation = await ConversationModel.findOne({
        _id: conversationId,
        $or: [{ members: userId }, { is_private: false }],
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

  showPopulate = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    const conversationId = req.params.id;
    try {
      const conversation = await ConversationModel.findOne({
        _id: conversationId,
        $or: [{ members: userId }, { is_private: false }],
      })
        .populate("members")
        .populate("creator")
        .exec();
      res.json({ status: "success", data: conversation });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / showPopulate:", error);
    }
  };

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const userId = req.userId;
      const isChannelExist = await ConversationModel.exists({
        name: req.body.name,
        is_channel: true,
      });
      const destId = req.body.id;
      // If body have id the it will be NOT channel and have only 2 members
      if (!isValidObjectId(destId)) {
        res.status(403).json({
          status: "error",
          data: "That ID is not correct.",
        });
      }
      // Check if channel name already taken
      if (isChannelExist) {
        res.status(403).json({
          status: "error",
          data: "That name is already taken by a channel.",
        });
      } else {
        // Check if Direct message already exist
        const isDMExist = await ConversationModel.findOne({
          is_channel: false,
          members: { $all: [destId, userId] },
        });
        // If Direct message exist redirect to that DM ID
        if (isDMExist) {
          res.status(409);
        } else {
          // If no channel and no dm create it
          const postData = {
            name: req.body.name,
            is_channel: req.body.isChannel,
            creator: req.userId,
            purpose: req.body.purpose,
            topic: req.body.topic,
            is_private: (destId && true) || req.body.isPrivate,
            members: [userId],
            num_members: req.body.isChannel ? 1 : 2,
            unread_count: 0,
          };
          if (destId) postData.members.push(destId);
          const conversationRaw = new ConversationModel(postData);
          const conversation = await conversationRaw.save();
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

  joinAll = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const userId = req.userId;
      await ConversationModel.updateMany(
        { is_private: false },
        {
          $addToSet: {
            members: userId,
          },
        }
      );
      const conversations = await ConversationModel.find({
        members: userId,
      })
        .sort({ name: 1 })
        .exec();
      res.json({ status: "success", data: conversations });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / joinAll:", error);
    }
  };

  addUsers = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const { conversationId, userId } = req.body;

      let company;
      if (!userId) {
        company = await CompanyModel.findOne({}).exec();
      }
      if (company) {
        await ConversationModel.findOneAndUpdate(
          {
            _id: conversationId,
            is_channel: true,
          },
          {
            $addToSet: {
              members: { $each: company.members },
            },
          },
          { new: true }
        ).exec();
        res.json({ status: "success", data: true });
      } else {
        if (!isValidObjectId(userId)) {
          res.status(403).json({
            status: "error",
            data: false,
          });
        } else {
          await ConversationModel.findOneAndUpdate(
            {
              _id: conversationId,
              is_channel: true,
            },
            {
              $addToSet: {
                members: userId,
              },
            },
            { new: true }
          ).exec();
          res.json({ status: "success", data: true });
        }
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
