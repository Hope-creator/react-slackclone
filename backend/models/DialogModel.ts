import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";

export interface IDialog {
  creator: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  unread_count: number;
}

export interface IDialogDocument extends IDialog, Document {}

const DialogSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
    unread_count: Number,
  },
  { versionKey: false, timestamps: true }
);

export const DialogModel = mongoose.model<IDialogDocument>(
  "Dialog",
  DialogSchema
);
