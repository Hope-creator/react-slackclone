import { IConversation } from "./ConversationModel";
import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";
import { IUser } from "./UserModel";
import { IFile } from "./FileModel";

export interface IMessage {
  creator: IUser | string;
  dest: IConversation | string;
  text: string;
  unreadBy: Schema.Types.ObjectId[];
  marked: boolean;
  attachments: Schema.Types.ObjectId[] | IFile[];
}

export interface IMessageDocument extends Document, IMessage {}

const MessageSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    dest: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    text: String,
    unreadBy: [Schema.Types.ObjectId],
    marked: { type: Boolean, default: false },
    attachments: [{ type: Schema.Types.ObjectId, ref: "File" }],
  },
  { versionKey: false, timestamps: true }
);

export const MessageModel = mongoose.model<IMessageDocument>(
  "Message",
  MessageSchema
);
