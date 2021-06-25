import { IMessage } from "./MessageModel";
import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";

export interface IConversation {
  name?: string;
  creator?: Schema.Types.ObjectId;
  description?: string;
  topic?: string;
  messages: IMessage[];
  is_private: boolean;
  num_members: number;
  unread_count: number;
}

export interface IConversationDocument extends IConversation, Document {}

const ConversationSchema = new Schema(
  {
    name: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    purpose: {
      value: String,
      creator: Schema.Types.ObjectId,
    },
    topic: {type: String, required: false},
    description: {type: String, required: false},
    is_private: {
      type: Boolean,
      default: false,
    },
    num_members: Number,
    unread_count: Number,
  },
  { versionKey: false, timestamps: true }
);

export const ConversationModel = mongoose.model<IConversationDocument>(
  "Conversation",
  ConversationSchema
);
