import mongoose from "mongoose";

export const idValidObjectId = (id: string) =>
  mongoose.Types.ObjectId.isValid(id);
