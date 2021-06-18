import { LocalHistoryItemType } from "../constants";
import { IConversation } from "./../store/modules/conversations/types";
import { IDialog } from "./../store/modules/dialogs/types";

export type LocalHistoryItem = {
  item: IDialog | IConversation | string;
  type: LocalHistoryItemType;
};

export const getLocalHistoryItems = () => {
  const history: string | undefined = localStorage["history"];
  if (history === undefined) {
    return [];
  } else {
    const items: LocalHistoryItem[] = JSON.parse(history);
    return items;
  }
};
