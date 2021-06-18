import { LocalHistoryItemType } from "../constants";
import { IConversation } from "./../store/modules/conversations/types";
import { IDialog } from "./../store/modules/dialogs/types";
import { LocalHistoryItem } from "./getLocalHistoryItems";

export const setLocalHistoryItem = (
  item: IDialog | IConversation | string,
  type: LocalHistoryItemType
) => {
  const history: string | undefined = localStorage["history"];

  if (history === undefined) {
    localStorage["history"] = JSON.stringify([{ item: item, type: type }]);
  } else {
    const parsed: LocalHistoryItem[] = JSON.parse(history);
    const index = parsed.findIndex((_checkItem) => {

      if (
        type === LocalHistoryItemType.DIALOG &&
        _checkItem.type === LocalHistoryItemType.DIALOG
      ) {
        console.log('ISTRUE',(_checkItem.item as IDialog)._id === (item as IDialog)._id )
        return (_checkItem.item as IDialog)._id === (item as IDialog)._id;
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
