import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";

export interface ICompany {
  name: string;
  primary_owner: {
    user_id: string;
    email: string;
  };
  members: Schema.Types.ObjectId[];
}

export interface ICompanyDocument extends ICompany, Document {}

const CompanySchema = new Schema(
  {
    _id: {
      type: String,
      default: "T01TE7T5WEV",
    },
    name: {
      required: true,
      type: String,
      default: "My new company",
    },
    primary_owner: {
      user_id: {
        type: String,
        default: "608e5c3854920a1b14202ab5",
      },
      email: {
        type: String,
        default: "goryachkin.ivan1@mail.ru",
      },
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { versionKey: false }
);

export const CompanyModel = mongoose.model<ICompanyDocument>(
  "Company",
  CompanySchema
);
