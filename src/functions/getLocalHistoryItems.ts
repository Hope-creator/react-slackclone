import { IUser } from './../store/modules/user/types';
import { LocalHistoryItemType } from "../constants";
import { IConversation } from "./../store/modules/conversations/types";

export type LocalHistoryItem = {
  item: IUser | IConversation | string;
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
