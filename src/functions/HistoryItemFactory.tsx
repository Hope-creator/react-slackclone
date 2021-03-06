import React from "react";
import { Channel } from "../components/Channel";
import { DirectMessageListItem } from "../components/DirectMessageListItem";
import { LocalHistoryItemType } from "../constants";
import { IConversation } from "../store/modules/conversations/types";
import { IUser } from "../store/modules/user/types";
import { LocalHistoryItem } from "./getLocalHistoryItems";
import { SidebarListCreator } from "./SidebarListCreator";

interface IHistoryItemFactoryProps {
  item: LocalHistoryItem;
  me: IUser;
  onClick: () => void;
}

export const HistoryItemFactory: React.FC<IHistoryItemFactoryProps> = ({
  item,
  onClick,
  me
}) => {
  if (item.type === LocalHistoryItemType.CONVERSATION) {
    return (
      <div onClick={onClick}>
        <Channel
          key={(item.item as IConversation)._id}
          channel={item.item as IConversation}
        />
      </div>
    );
  }
  if (item.type === LocalHistoryItemType.USER) {
    return (
      <div onClick={onClick}>
        <DirectMessageListItem
          key={(item.item as IUser)._id}
          user={item.item as IUser}
          me={me}
        />
      </div>
    );
  }
  if (item.type === LocalHistoryItemType.CUSTOM) {
    return (
      <div onClick={onClick}>
        <SidebarListCreator
          key={item.item as string}
          componentName={item.item as string}
        />
      </div>
    );
  }
  return null
};
