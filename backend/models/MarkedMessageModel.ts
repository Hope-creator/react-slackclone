import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";
import { IUser } from "./UserModel";

export interface IMarkedMessage {
  user: IUser | string
  markedMessages: Schema.Types.ObjectId[] | string[];
}

export interface IMarkedMessageDocument extends Document, IMarkedMessage {}

const MarkedMessage = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    markedMessage: {
      type: Schema.Types.ObjectId, ref: "Message"
    }
  },
  { versionKey: false, timestamps: true }
);

export const MarkedMessageModel = mongoose.model<IMarkedMessageDocument>(
  "MarkedMessage",
  MarkedMessage
);
