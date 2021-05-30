import { IUser } from "./../../src/store/modules/user/types";
import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";
import { IMessage } from "./MessageModel";
import { IConversation } from "./ConversationModel";

export interface IFile {
  filename: string;
  url: string;
  conversation: IConversation | Schema.Types.ObjectId;
  user: IUser | Schema.Types.ObjectId;
}

export interface IFileDocument extends IFile, Document {}

const FileSchema = new Schema(
  {
    filename: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
    },
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

export const FileModel = mongoose.model<IFileDocument>("File", FileSchema);
