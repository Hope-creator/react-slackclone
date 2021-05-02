import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";

export interface IUser extends Document {
  companyId: string,
  name: string,
  email: string,
  status: string,
  isAdmin: boolean,
  password: string,
  displayName?: string,
  avatar?: string
}

const UserSchema = new Schema({
  companyId: {
    type: String,
    default: "T01TE7T5WEV",
  },
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
  password: {
    require: true,
    type: String,
    select:false
  },
  displayName: String,
  avatar: String,
  
}, {versionKey: false});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
