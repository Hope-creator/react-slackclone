import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";
import { IUser } from "./UserModel";

export interface ISecretCode extends Document {
  email: IUser["email"];
  code: string;
}

const secretCode = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    expires: 600,
  },
});

export const CodeModel = mongoose.model<ISecretCode>("Code", secretCode);
