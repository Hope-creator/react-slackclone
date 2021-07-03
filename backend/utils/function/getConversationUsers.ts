import { Schema } from "mongoose";
import { UserModel } from "../../models/UserModel";

export const getConversationUsers = async (
  convId: Schema.Types.ObjectId
) => {
  const users = (
    await UserModel.find({
      conversations: convId,
    }).distinct("_id")
  ).map((id: Schema.Types.ObjectId) => id.toString());
  return users;
};
