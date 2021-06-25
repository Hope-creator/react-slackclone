import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { DialogModel } from "../models/DialogModel";
import { MessageModel } from "../models/MessageModel";
import { UserModel } from "../models/UserModel";
import { getAggregateMessage } from "../utils/function/getAggregateMessage";
import { getAggregateMessageWithPagination } from "../utils/function/getAggregateMessageWithPagination";

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
    const partnerId = req.params.id;
    const { page = 1, count = 40 } = req.query;
    const skipPage = page > 0 ? (Number(page) - 1) * Number(count) : 0;
    if (!isValidObjectId(partnerId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        const partner = await UserModel.findOne({
          _id: partnerId,
        }).exec();
        if (!partner) {
          res.status(400).json({ status: "error", data: "User doesn't exist" });
          return;
        }
        const messages = await getAggregateMessageWithPagination(
          {
            $or: [
              { creator: user._id, dest: partner._id },
              { creator: partner._id, dest: user._id },
            ],
          },
          user._id,
          skipPage,
          Number(count)
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
    const partnerId = req.body.id;
    if (!isValidObjectId(partnerId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
      return;
    }
    try {
      const partner = await UserModel.findOne({
        _id: partnerId,
      }).exec();
      if (!partner) {
        res.status(400).json({ status: "error", data: "User doesn't exist" });
      } else {
        /*const partnerId =
          dialog.creator.toString() !== user._id.toString()
            ? dialog.creator
            : dialog.partner;
        if (partnerId.toString() !== user._id.toString()) {
          unreadBy = await UserModel.findOne({
            _id: partnerId,
          });
        }*/
        const unreadBy = partner._id;
        const postData = {
          creator: req.userId,
          dest: partner._id,
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
        /*await DialogModel.findByIdAndUpdate(
          dialog._id,
          { last_message: data._id },
          { new: true }
        );*/
        this.io
          .to([message.dest.toString(), user._id.toString()])
          .emit("SERVER:NEW_DIRECTMESSAGE", message);

        this.io.to(unreadBy.toString()).emit("SERVER:NEW_UNREAD", message);
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
