import { ICompany } from "./CompanyModel";
import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";
import differenceInMinutes from "date-fns/differenceInMinutes";

export interface IUser {
  company: ICompany | string;
  name: string;
  email: string;
  status: string;
  is_admin: boolean;
  display_name?: string;
  avatar?: string;
  work?: string;
  password?: string;
  phone?: number;
  last_seen: Date;
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
      unique: [true, "Email is already taken"],
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
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  { versionKey: false }
);

UserSchema.virtual("isOnline").get(function (this: any) {
  return differenceInMinutes(new Date(), this.last_seen) < 5;
});

UserSchema.set("toJSON", {
  virtuals: true,
});

UserSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Email must be unique"));
  } else {
    next(error);
  }
});

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
