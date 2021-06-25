import express from "express";
import { isValidObjectId } from "mongoose";
import { MessageModel } from "../models/MessageModel";
import { getAggregateMessageWithPagination } from "../utils/function/getAggregateMessageWithPagination";

class MarkedMessageController {
  index = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const user = req.user;
    const { page = 1, count = 40 } = req.query;
    const skipPage = page > 0 ? (Number(page) - 1) * Number(count) : 0;
    try {
      const markedMessages = await getAggregateMessageWithPagination(
        { markedBy: user._id },
        user._id,
        skipPage,
        Number(count)
      );
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
    const user = req.user;
    const messageId = req.body.messageId;
    if (!isValidObjectId(messageId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        await MessageModel.findOneAndUpdate(
          {
            _id: messageId,
          },
          {
            $addToSet: {
              markedBy: user._id,
            },
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
    const user = req.user;
    const messageId = req.body.messageId;
    if (!isValidObjectId(messageId)) {
      res.status(400).json({ status: "error", data: "Wrong type of ID" });
    } else {
      try {
        await MessageModel.findOneAndUpdate(
          {
            _id: messageId,
          },
          {
            $pull: {
              markedBy: user._id,
            },
          }
        );
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
