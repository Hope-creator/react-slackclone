import { IMessage } from "./MessageModel";
import { IUser } from "./UserModel";
import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";

export interface IPurpose {
  value: string;
  creator: Schema.Types.ObjectId;
}

export interface ITopic extends IPurpose {}

export interface IConversation {
  name: string;
  is_channel?: boolean;
  created: Date;
  creator?: Schema.Types.ObjectId;
  purpose?: IPurpose;
  topic?: ITopic;
  messages: IMessage[];
  is_private: boolean;
  members: IUser[] | string[];
  num_members: number;
  unread_count: number;
}

export interface IConversationDocument extends IConversation, Document {
}

const ConversationSchema = new Schema(
  {
    name: String,
    is_channel: Boolean,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    purpose: {
      value: String,
      creator: Schema.Types.ObjectId,
    },
    topic: {
      value: String,
      creator: Schema.Types.ObjectId,
    },
    is_private: Boolean,
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    num_members: Number,
    unread_count: Number,
  },
  { versionKey: false, timestamps: true }
);

export const ConversationModel = mongoose.model<IConversationDocument>(
  "Conversation",
  ConversationSchema
);
