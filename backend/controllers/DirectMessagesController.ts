import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { DialogModel } from "../models/DialogModel";
import { MessageModel } from "../models/MessageModel";
import { UserModel } from "../models/UserModel";
import { getAggregateMessage } from "../utils/function/getAggregateMessage";

class DirectMessagesController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const dialogId = req.params.id;
    if (!isValidObjectId(dialogId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const dialog = await DialogModel.findOne({
          _id: dialogId,
          $or: [{ creator: user._id }, { partner: user._id }],
        }).exec();
        if (!dialog) {
          res
            .status(400)
            .json({ status: "error", data: "Dialog doesn't exist" });
          return;
        }
        const messages = await getAggregateMessage(
          { dest: dialog._id },
          user._id
        );
        res.json({ status: "success", data: messages });
      } catch (error) {
        res.status(500).json({
          status: "error",
          errors: JSON.stringify(error),
        });
        console.log("Error on MessagesController / index:", error);
      }
    }
  };

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const dialogsId = req.body.id;
    if (!isValidObjectId(dialogsId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
      return;
    }
    try {
      const dialog = await DialogModel.findOne({
        _id: dialogsId,
        $or: [{ creator: user._id }, { partner: user._id }],
      }).exec();
      if (!dialog) {
        res.status(400).json({ status: "error", data: "Dialog doesn't exist" });
      } else {
        let unreadBy = undefined;
        const partnerId =
          dialog.creator.toString() !== user._id.toString()
            ? dialog.creator
            : dialog.partner;
        if (partnerId.toString() !== user._id.toString()) {
          unreadBy = await UserModel.findOne({
            _id: partnerId,
          });
        }
        const postData = {
          creator: req.userId,
          dest: dialog.id,
          text: req.body.text,
          unreadBy: unreadBy,
          attachments: req.body.attachments,
        };
        const data = await new MessageModel(postData).save();
        const aggregateArr = await getAggregateMessage(
          { _id: data._id },
          user._id
        );
        const message = aggregateArr[0];
        await DialogModel.findByIdAndUpdate(
          dialog._id,
          { last_message: data._id },
          { new: true }
        );
        this.io
          .to(message.dest.toString())
          .emit("SERVER:NEW_DIRECTMESSAGE", message);
        // Check on user
        if (unreadBy) {
          this.io
            .to(unreadBy._id.toString())
            .emit("SERVER:NEW_UNREAD", message);
        }
        res.json({ status: "success", data: message });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on MessagesController / create:", error);
    }
  };
}

export default DirectMessagesController;
