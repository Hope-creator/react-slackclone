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

class ConversationMembersController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const conversationId = req.params.id;
    if (!isValidObjectId(conversationId)) {
      res.status(403).json({
        status: "error",
        data: "That ID is not correct.",
      });
    } else {
      try {
        const user = req.user;
        const conversation = await ConversationModel.findOne({
          _id: conversationId,
          $or: [{ _id: { $in: user.conversations } }, { is_private: false }],
        }).exec();
        if (!conversation) {
          res.status(404).json({
            status: "error",
            data: "Conversation not found or you do not have access",
          });
        } else {
          const members = await UserModel.find({
            conversations: { $in: [conversation._id] },
          }).exec();
          res.json({ status: "success", data: members });
        }
      } catch (error) {
        res.status(500).json({
          status: "error",
          errors: JSON.stringify(error),
        });
        console.log("Error on ConversationController / index:", error);
      }
    }
  };

  join = async (req: express.Request, res: express.Response): Promise<void> => {
    const user = req.user;
    const conversationId = req.body.id;
    if (conversationId && !isValidObjectId(conversationId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        if (conversationId) {
          const conversation = await ConversationModel.findById(conversationId);
          if (conversation) {
            await UserModel.updateOne(
              { _id: user._id },
              {
                $addToSet: {
                  conversations: conversation._id,
                },
              },
              { new: true }
            );
            res.json({ status: "success", data: conversation });
          } else {
            res
              .status(404)
              .json({ status: "error", data: "Conversation not found" });
          }
        } else {
          const conversations = await ConversationModel.find({
            is_private: false,
            is_channel: false,
          }).distinct("_id");
          console.log(conversations);
          /*await UserModel.updateOne({_id: userId}, {
            $addToSet: {
              conversations: conversation._id,
            },
          },{
            new: true
          })*/
          // ДОДЕЛАТЬ
          res.json({ status: "success", data: true });
        }
      } catch (error) {
        res.status(500).json({
          status: "error",
          errors: JSON.stringify(error),
        });
        console.log("Error on ConversationController / joinAll:", error);
      }
    }
  };

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const { conversationId, userId } = req.body;
    if (!isValidObjectId(conversationId)) {
      res.status(403).json({
        status: "error",
        data: "Wrong type of conversation id",
      });
    } else {
      try {
        const conversation = await ConversationModel.findOne({
          _id: conversationId,
          $or: [{ _id: { $in: user.conversations } }, { is_private: false }],
        });
        if (!conversation) {
          res.status(404).json({
            status: "error",
            data: "Conversation does not exists or you do not have rights to add people",
          });
        } else {
          if (userId) {
            if (!isValidObjectId(userId)) {
              res.status(403).json({
                status: "error",
                data: "Wrong type of user id",
              });
            } else {
              await UserModel.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { converastions: conversation._id } },
                { new: true }
              );
              res.json({ status: "success", data: true });
            }
          } else {
            // if userId not provided then add all people in company
            await UserModel.updateMany(
              {},
              {
                $addToSet: {
                  conversations: conversation._id,
                },
              },
              {
                new: true,
              }
            );
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
    }
  };

  delete = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const user = req.user;
      const { conversationId, userId } = req.body;
      if (!isValidObjectId(userId)) {
        res.status(403).json({
          status: "error",
          data: "Wrong type of user id",
        });
        return;
      }
      if (!isValidObjectId(conversationId)) {
        res.status(403).json({
          status: "error",
          data: "Wrong type of conversation id",
        });
        return;
      }
      const conversation = await ConversationModel.findOne({
        $and: [{ _id: conversationId }, { _id: { $in: user.conversations } }],
        creator: user._id,
      });
      if (!conversation) {
        res.status(404).json({
          status: "error",
          data: "Conversation does not exists or you do not have rights to do this",
        });
        return;
      }
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { conversations: [conversation._id] } }
      );
      res.json({
        status: "success",
        data: true,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / update:", error);
    }
  };
}

export default ConversationMembersController;
