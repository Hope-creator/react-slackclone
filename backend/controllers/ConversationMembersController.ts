import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { ConversationModel } from "../models/ConversationModel";
import { UserModel } from "../models/UserModel";

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
    if (!isValidObjectId(conversationId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const conversation = await ConversationModel.findOneAndUpdate(
          { _id: conversationId, is_private: false },
          { $inc: { num_members: 1 } },
          { new: true }
        );
        if (conversation) {
          const userWithNewConversations = await UserModel.findOneAndUpdate(
            { _id: user._id, conversations: { $ne: conversation._id } },
            {
              $addToSet: {
                conversations: conversation._id,
              },
            },
            { new: true }
          );
          if (!userWithNewConversations) {
            res
              .status(400)
              .json({ status: "error", data: "User already in channel" });
            return;
          }
          if (userWithNewConversations) {
            if (conversation.is_private) {
              const users = (
                await UserModel.find({
                  conversations: conversation._id,
                }).distinct("_id")
              ).map((id) => id.toString());
              this.io
                .to(users)
                .emit("SERVER:CONVERSATION_UPDATE", conversation);
              this.io
                .to(users)
                .emit("SERVER:NEW_CONVERSATION_MEMBER", user, conversation._id);
            } else {
              this.io.emit("SERVER:CONVERSATION_UPDATE", conversation);
              this.io.emit(
                "SERVER:NEW_CONVERSATION_MEMBER",
                user,
                conversation._id
              );
            }

            res.json({
              status: "success",
              data: conversation,
            });
            return;
          }
        } else {
          res
            .status(404)
            .json({ status: "error", data: "Conversation not found" });
          return;
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
      return;
    }
    if (userId && !isValidObjectId(userId)) {
      res.status(403).json({
        status: "error",
        data: "Wrong type of user id",
      });
      return;
    }
    try {
      if (userId) {
        const isUserExists = UserModel.exists({ _id: userId });
        if (!isUserExists) {
          res
            .status(404)
            .json({ statur: "error", data: "Required user doesn't exists" });
          return;
        }
        const conversation = await ConversationModel.findOne({
          _id: conversationId,
          $or: [{ creator: user._id }, { is_private: false }],
        });
        if (!conversation) {
          res.status(404).json({
            status: "error",
            data: "Conversation does not exists or you do not have rights to add people",
          });
          return;
        }
        const addedUser = await UserModel.findOneAndUpdate(
          { _id: userId, conversations: { $ne: conversation._id } },
          { $addToSet: { conversations: conversation._id } },
          { new: true }
        );
        if (!addedUser) {
          res.status(403).json({
            status: "error",
            data: "User already in channel",
          });
          return;
        }
        const updatedConversation = await ConversationModel.findOneAndUpdate(
          {
            _id: conversation._id,
            $or: [{ creator: user._id }, { is_private: false }],
          },
          { $inc: { num_members: 1 } },
          { new: true }
        );
        if (!updatedConversation) {
          res.status(404).json({
            status: "error",
            data: "Conversation does not exists or you do not have rights to add people",
          });
          return;
        }
        const users = (
          await UserModel.find({
            conversations: conversation._id,
          }).distinct("_id")
        ).map((id) => id.toString());
        this.io
          .to(users)
          .emit("SERVER:CONVERSATION_UPDATE", updatedConversation);
        this.io
          .to(users)
          .emit("SERVER:NEW_CONVERSATION_MEMBER", addedUser, conversation._id);
        res.json({ status: "success", data: true });
      } else {
        // if userId not provided then add all people in company
        const conversation = await ConversationModel.findOne({
          _id: conversationId,
          $or: [{ creator: user._id }, { is_private: false }],
        });
        if (!conversation) {
          res.status(404).json({
            status: "error",
            data: "Conversation does not exists or you do not have rights to add people",
          });
          return;
        }
        const updatedUsers = await UserModel.updateMany(
          {},
          {
            $addToSet: {
              conversations: conversation._id,
            },
          }
        );
        const updatedConversation = await ConversationModel.findOneAndUpdate(
          {
            _id: conversationId,
            $or: [{ creator: user._id }, { is_private: false }],
          },
          {
            num_members: updatedUsers.nModified,
          },
          { new: true }
        );
        if (!updatedConversation) {
          res.status(404).json({
            status: "error",
            data: "Conversation does not exists or you do not have rights to add people",
          });
          return;
        }

        if (updatedConversation.is_private) {
          // if channel private emit only users in
          const users = (
            await UserModel.find({
              conversations: conversation._id,
            }).distinct("_id")
          ).map((id) => id.toString());
          this.io
            .to(users)
            .emit("SERVER:CONVERSATION_UPDATE", updatedConversation);
          this.io
            .to(users)
            .emit(
              "SERVER:NEW_CONVERSATION_MEMBER_MANY",
              updatedConversation._id
            );
        } else {
          this.io.emit("SERVER:CONVERSATION_UPDATE", updatedConversation);
          this.io.emit(
            "SERVER:NEW_CONVERSATION_MEMBER_MANY",
            updatedConversation._id
          );
        }

        res.json({ status: "success", data: true });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / create:", error);
    }
  };

  /*
   * If userId in request body and user exists in DB and
   * requested user creator of a conversation
   * it will remove conversation from request body user
   *
   * If userId not provided converstion
   * will be removed in requested user conversations
   */

  delete = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    try {
      const user = req.user;
      const { conversationId, userId } = req.body;
      if (userId === user._id) {
        res.status(400).json({
          status: "error",
          data: "Cant kick self",
        });
        return;
      }
      if (!isValidObjectId(userId)) {
        res.status(403).json({
          status: "error",
          data: "Wrong type of user id ",
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
      const findUser = userId && (await UserModel.findById(userId));
      if (userId && !findUser) {
        res.status(403).json({
          status: "error",
          data: "User not found",
        });
        return;
      }
      if (userId && !findUser.conversations.includes(conversationId)) {
        res.status(403).json({
          status: "error",
          data: "Not in channel",
        });
        return;
      }
      const conversationFindQuery = userId
        ? {
            $and: [
              { _id: conversationId },
              { _id: { $in: user.conversations } },
            ],
            creator: user._id,
          }
        : {
            $and: [
              { _id: conversationId },
              { _id: { $in: user.conversations } },
            ],
          };
      const conversation = await ConversationModel.findOneAndUpdate(
        conversationFindQuery,
        { $inc: { num_members: -1 } },
        { new: true }
      );
      if (!conversation) {
        res.status(404).json({
          status: "error",
          data: "Conversation does not exists or you do not have rights to do this",
        });
        return;
      }
      const kickedUser = await UserModel.findByIdAndUpdate(
        userId ? userId : user._id,
        { $pull: { conversations: conversation._id } }
      );
      findUser &&
        this.io
          .to(findUser._id.toString())
          .emit("SERVER:CONVERSATION_KICKED", conversation);

      if (conversation.is_private) {
        // if channel private emit only users in
        const users = (
          await UserModel.find({
            conversations: conversation._id,
          }).distinct("_id")
        ).map((id) => id.toString());
        this.io.to(users).emit("SERVER:CONVERSATION_UPDATE", conversation);
        this.io
          .to(users)
          .emit("SERVER:MEMBER_KICKED", kickedUser, conversation._id);
      } else {
        this.io.emit("SERVER:CONVERSATION_UPDATE", conversation);
        this.io.emit("SERVER:MEMBER_KICKED", kickedUser, conversation._id);
      }
      res.json({
        status: "success",
        data: conversation,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / delete:", error);
    }
  };
}

export default ConversationMembersController;
