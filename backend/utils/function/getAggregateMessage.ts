import { mongoose } from "../../core/db";
import { MessageModel } from "../../models/MessageModel";

export const getAggregateMessage = async (
  matchQuery: Object,
  userId: string
) => {
  return await MessageModel.aggregate([
    { $match: matchQuery },
    {
      $addFields: {
        marked: {
          $in: [mongoose.Types.ObjectId(userId), "$markedBy"],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "creator",
      },
    },
    { $unwind: "$creator" },
    {
      $lookup: {
        from: "files",
        localField: "attachments",
        foreignField: "_id",
        as: "attachments",
      },
    },
    {
      $project: {
        markedBy: 0,
        creator: { password: 0, status: 0 },
      },
    },
  ]).exec();
};
