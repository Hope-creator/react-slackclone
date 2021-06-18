import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { ConversationModel } from "../models/ConversationModel";
import { DialogModel } from "../models/DialogModel";
import { UserModel } from "../models/UserModel";

/*
  creator: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  unread_count: number;
  */

class DialogController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const search = req.query.search;
    try {
      let searchQuery = {};
      if (typeof search === "string") {
        const escapedSearch = search.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&")
        searchQuery = {
          $or: [
            {
              "creator.name": { $regex: escapedSearch, $options: "i" },
              "partner._id": user._id,
            },
            {
              "partner.name": { $regex: escapedSearch, $options: "i" },
              "creator._id": user._id,
            },
          ],
        };
      }

      const dialogs = await DialogModel.aggregate([
        { $match: { $or: [{ creator: user._id }, { partner: user._id }] } },
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
            from: "users",
            localField: "partner",
            foreignField: "_id",
            as: "partner",
          },
        },
        { $unwind: "$partner" },
        {
          $lookup: {
            from: "messages",
            localField: "last_message",
            foreignField: "_id",
            as: "last_message",
          },
        },
        {
          $unwind: { path: "$last_message", preserveNullAndEmptyArrays: true },
        },
        {
          $match: searchQuery,
        },
        {
          $lookup: {
            from: "users",
            localField: "last_message.creator",
            foreignField: "_id",
            as: "last_message.creator",
          },
        },
        {
          $unwind: {
            path: "$last_message.creator",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "files",
            localField: "last_message.attachments",
            foreignField: "_id",
            as: "last_message.attachments",
          },
        },
        {
          $unwind: {
            path: "$last_message.attachments",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      res.json({ status: "success", data: dialogs });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on DialogController / index:", error);
    }
  };

  getId = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const partnerId = req.params.userid;
    if (!isValidObjectId(partnerId)) {
      res.status(403).json({
        status: "error",
        data: "Wrong type of ID",
      });
      return;
    }
    try {
      const partner = await UserModel.findById(partnerId);

      if (!partner) {
        res
          .status(404)
          .json({ status: "error", data: "User dialog not founded" });
        return;
      }

      const dialog = await DialogModel.findOne({
        $or: [
          { creator: user._id, partner: partner._id },
          { creator: partner._id, partner: user._id },
        ],
      }).exec();
      if (!dialog) {
        res.status(404).json({ status: "error", data: "Dialog do not exists" });
        return;
      }
      res.json({ status: "success", data: dialog._id });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on ConversationController / show:", error);
    }
  };

  show = async (req: express.Request, res: express.Response): Promise<void> => {
    const user = req.user;
    const dialogId = req.params.id;
    if (!isValidObjectId(dialogId)) {
      res.status(403).json({
        status: "error",
        data: "Wrong type of conversation ID",
      });
      return;
    }
    try {
      const dialog = await DialogModel.findOne({
        _id: dialogId,
        $or: [{ creator: user._id }, { partner: user._id }],
      })
        .populate("creator")
        .populate("partner")
        .exec();
      if (!dialog) {
        res
          .status(404)
          .json({ status: "error", data: "Dialog does not exists" });
      }
      res.json({ status: "success", data: dialog });
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
      const destId = req.body.id;

      if (!isValidObjectId(destId)) {
        res.status(403).json({
          status: "error",
          data: "That ID is not correct.",
        });
        return;
      }

      const isDialogExist = await DialogModel.exists({
        $or: [
          { creator: user._id, partner: destId },
          { creator: destId, partner: user._id },
        ],
      });

      // Check if channel name already taken
      if (isDialogExist) {
        res.status(409);
        return;
      }

      // If no channel and no dm create it
      const postData = {
        creator: req.userId,
        partner: destId,
        unread_count: 0,
      };
      const dialog = await new DialogModel(postData).save();
      this.io.emit("SERVER:DIALOG_CREATED");
      res.json({ status: "success", data: dialog });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on DialogController / create:", error);
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
      console.log("Error on DialogController / update:", error);
    }
  };
}

export default DialogController;
