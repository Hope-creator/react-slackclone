import { mongoose } from "../../core/db";
import { MessageModel } from "../../models/MessageModel";

export const getAggregateMessageWithPagination = async (
  matchQuery: Object,
  userId: string,
  skipPage: number,
  count: number
) => {
  return (
    await MessageModel.aggregate([
      { $match: matchQuery },
      { $sort: { createdAt: -1 } },
      {
        $addFields: {
          marked: {
            $in: [new mongoose.Types.ObjectId(userId), "$markedBy"],
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
      {
        $facet: {
          results: [{ $skip: skipPage }, { $limit: Number(count) }],
          totalCount: [
            {
              $count: "total",
            },
          ],
        },
      },
      {
        $addFields: {
          totalCount: {
            $arrayElemAt: ["$totalCount.total", 0],
          },
        },
      },
    ]).exec()
  )[0];
};
