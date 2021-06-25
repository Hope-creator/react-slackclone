import { IUser } from './../store/modules/user/types';
import { LocalHistoryItemType } from "../constants";
import { IConversation } from "./../store/modules/conversations/types";
import { LocalHistoryItem } from "./getLocalHistoryItems";

export const setLocalHistoryItem = (
  item: IUser | IConversation | string,
  type: LocalHistoryItemType
) => {
  const history: string | undefined = localStorage["history"];

  if (history === undefined) {
    localStorage["history"] = JSON.stringify([{ item: item, type: type }]);
  } else {
    const parsed: LocalHistoryItem[] = JSON.parse(history);
    const index = parsed.findIndex((_checkItem) => {

      if (
        type === LocalHistoryItemType.USER &&
        _checkItem.type === LocalHistoryItemType.USER
      ) {
        return (_checkItem.item as IUser)._id === (item as IUser)._id;
      }
      if (
        type === LocalHistoryItemType.CONVERSATION &&
        _checkItem.type === LocalHistoryItemType.CONVERSATION
      ) {
        return (
          (_checkItem.item as IConversation)._id ===
          (item as IConversation)._id
        );
      }
      if (
        type === LocalHistoryItemType.CUSTOM &&
        _checkItem.type === LocalHistoryItemType.CUSTOM
      ) {
        return (_checkItem.item as string) === (item as string);
      }
      return false;
    });
    console.log("index",index)
    if (index !== -1) {
      parsed.splice(index, 1);
    }
    const newItems = [{ item: item, type: type }, ...parsed];
    if (newItems.length > 10) {
      newItems.pop();
    }
    localStorage["history"] = JSON.stringify(newItems);
  }
};
