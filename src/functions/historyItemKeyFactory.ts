import { LocalHistoryItemType } from "../constants";
import { IConversation } from "../store/modules/conversations/types";
import { IDialog } from "../store/modules/dialogs/types";
import { LocalHistoryItem } from "./getLocalHistoryItems";

export const historyItemKeyFactory = (item: LocalHistoryItem) => {
  if (item.type === LocalHistoryItemType.CONVERSATION) {
    return (item.item as IConversation)._id;
  }
  if (item.type === LocalHistoryItemType.DIALOG) {
    return (item.item as IDialog)._id;
  }
  if (item.type === LocalHistoryItemType.CUSTOM) {
    return item.item as string;
  }
  return null;
};
