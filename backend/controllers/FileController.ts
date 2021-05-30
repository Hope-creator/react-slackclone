import express from "express";
import { isValidObjectId } from "mongoose";
import socket from "socket.io";
import cloudinary from "../core/cloudinary";
import { ConversationModel } from "../models/ConversationModel";
import { FileModel } from "../models/FileModel";
import { MarkedMessageModel } from "../models/MarkedMessageModel";
import { MessageModel } from "../models/MessageModel";

class FileController {
  upload = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const userId = req.userId;
    const files = req.files;
    if (!files) {
      res.status(400).json({ status: "error", message: "No files attached" });
    } else {
      const conversationId = req.body.conversationId;
      if (!isValidObjectId(conversationId) || !conversationId) {
        res
          .status(400)
          .json({ status: "error", data: "Wrong conversation id type" });
      } else {
        try {
          const isExist = ConversationModel.exists({ _id: conversationId });
          if (!isExist) {
            res
              .status(404)
              .json({ status: "error", data: "Converastion does not exist" });
          } else {
            try {
              const uploadedFiles = await Promise.all(
                (files as Express.Multer.File[]).map(async (file) => {
                  const uploadedFile = await cloudinary.v2.uploader.upload(
                    file.path,
                    function (error, result) {
                      if (error || !result) {
                        console.log(error);
                        return res.status(500).json({
                          status: "error",
                          data: "Some error on upload file server was occured",
                        });
                      }
                    }
                  );
                  return uploadedFile;
                })
              );
              const savedFiles = await Promise.all(
                uploadedFiles.map(async (file) => {
                  const data = {
                    filename: file.original_filename,
                    url: file.url,
                    conversation: conversationId,
                    user: userId,
                  };
                  return await new FileModel(data).save();
                })
              );
              const savedFilesId = savedFiles.map((file) => file._id);
              res.json({ status: "sucess", data: savedFilesId });
            } catch (err) {
              console.log(err);
              res
                .status(500)
                .json({ status: "error", data: "File upload error" });
            }
          }
        } catch (err) {
          res
            .status(500)
            .json({ status: "error", data: "Something went wrong" });
          console.log("Error on FileController / upload:", err);
        }
      }
    }
  };
}

export default FileController;
