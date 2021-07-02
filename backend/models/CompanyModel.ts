import { Schema, Document } from "mongoose";
import { mongoose } from "../core/db";

export interface ICompany {
  name: string;
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
  },
  { versionKey: false }
);

export const CompanyModel = mongoose.model<ICompanyDocument>(
  "Company",
  CompanySchema
);
