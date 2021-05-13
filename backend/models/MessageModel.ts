import { IConversation } from "./ConversationModel";
import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";
import { IUser } from "./UserModel";

export interface IMessage {
  creator: IUser | string;
  dest: IConversation | string;
  text: string;
  read: boolean;
  marked: boolean;
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
    text: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    marked: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

export const MessageModel = mongoose.model<IMessageDocument>(
  "Message",
  MessageSchema
);
