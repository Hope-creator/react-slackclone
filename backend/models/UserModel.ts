import { ICompany } from "./CompanyModel";
import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";

export interface IUser {
  company: ICompany | string;
  name: string;
  email: string;
  status: string;
  is_admin: boolean;
  conversations: Schema.Types.ObjectId[];
  display_name?: string;
  avatar?: string;
  work?: string;
  password?: string;
  phone?: number;
  away: boolean;
  online: boolean;
}

export interface IUserDocument extends IUser, Document {
  password: string;
}

const UserSchema = new Schema(
  {
    company: {
      type: String,
      default: "T01TE7T5WEV",
      ref: "Company",
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
      select: false,
    },
    is_admin: {
      type: Boolean,
      default: true,
    },
    password: {
      require: true,
      type: String,
      select: false,
    },
    display_name: String,
    avatar: String,
    work: String,
    phone: Number,
    conversations: [{ type: Schema.Types.ObjectId, ref: "Conversations" }],
    away: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Email must be unique"));
  } else {
    next(error);
  }
});

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
