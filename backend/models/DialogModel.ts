import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";
import { IMessage } from "./MessageModel";

export interface IDialog {
  creator: Schema.Types.ObjectId;
  partner: Schema.Types.ObjectId;
  last_message: IMessage | string | undefined;
  unread_count: number;
}

export interface IDialogDocument extends IDialog, Document {}

const DialogSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    last_message: { type: Schema.Types.ObjectId, ref: "Message" },
    unread_count: Number,
  },
  { versionKey: false, timestamps: true }
);

export const DialogModel = mongoose.model<IDialogDocument>(
  "Dialog",
  DialogSchema
);
