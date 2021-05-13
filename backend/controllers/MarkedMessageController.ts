import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import { MarkedMessageModel } from "../models/MarkedMessageModel";

class MarkedMessageController {
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
      const markedMessages = await MarkedMessageModel.find({
        user: userId,
      }).exec();
      res.json({ status: "success", data: markedMessages });
    } catch (error) {
      res.status(500).json({
        status: "error",
        errors: JSON.stringify(error),
      });
      console.log("Error on MessagesController / index:", error);
    }
  };

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    const messageId = req.body.id;
    if (!isValidObjectId(messageId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        await MarkedMessageModel.findOneAndUpdate(
          {
            user: userId,
            markedMessage: messageId,
          },
          {},
          {
            upsert: true,
          }
        );
        res.json({ status: "success", data: true });
      } catch (error) {
        res.status(500).json({
          status: "error",
          data: false,
        });
        console.log("Error on MessagesController / mark:", error);
      }
    }
  };

  delete = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    const messageId = req.params.id;
    if (!isValidObjectId(messageId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        await MarkedMessageModel.findOneAndRemove({
          user: userId,
          markedMessage: messageId,
        });
        res.json({ status: "success", data: true });
      } catch (error) {
        res.status(500).json({
          status: "error",
          errors: JSON.stringify(error),
        });
        console.log("Error on MessagesController / unmark:", error);
      }
    }
  };
}

export default MarkedMessageController;
