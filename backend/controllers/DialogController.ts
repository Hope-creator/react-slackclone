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
    try {
      const dialogs = await DialogModel.find({ members: user._id })
        .sort({ unread_count: 1 })
        .exec();
      res.json({ status: "success", data: dialogs });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on DialogController / index:", error);
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
        members: user._id,
      });
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
        members: { $all: [user._id, destId] },
      });

      // Check if channel name already taken
      if (isDialogExist) {
        res.status(409);
        return;
      }

      // If no channel and no dm create it
      const postData = {
        creator: req.userId,
        members: [user._id, destId],
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
