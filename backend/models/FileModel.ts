import { IUser } from "./UserModel";
import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";

export interface IFile {
  filename: string;
  url: string;
  dest: Schema.Types.ObjectId;
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
    dest: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

export const FileModel = mongoose.model<IFileDocument>("File", FileSchema);
