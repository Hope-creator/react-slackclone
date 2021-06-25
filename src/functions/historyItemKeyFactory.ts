import { IUser } from './../store/modules/user/types';
import { LocalHistoryItemType } from "../constants";
import { IConversation } from "../store/modules/conversations/types";
import { LocalHistoryItem } from "./getLocalHistoryItems";

export const historyItemKeyFactory = (item: LocalHistoryItem) => {
  if (item.type === LocalHistoryItemType.CONVERSATION) {
    return (item.item as IConversation)._id;
  }
  if (item.type === LocalHistoryItemType.USER) {
    return (item.item as IUser)._id;
  }
  if (item.type === LocalHistoryItemType.CUSTOM) {
    return item.item as string;
  }
  return null;
};
