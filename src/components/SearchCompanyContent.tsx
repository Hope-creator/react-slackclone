import React from "react";
import { useSelector } from "react-redux";
import {
  selectSearchedConversations,
  selectSearchedCustoms,
  selectSearchedDialogs,
} from "../store/modules/search/selectors";
import { DirectMessageListItem } from "./DirectMessageListItem";
import { IUser } from "../store/modules/user/types";
import { Channel } from "./Channel";
import { SidebarListCreator } from "../functions/SidebarListCreator";

interface ISearchCompanyContentProps {
  user: IUser;
}

export const SearchCompanyContent: React.FC<ISearchCompanyContentProps> = ({
  user,
}) => {
  const searchedConversations = useSelector(selectSearchedConversations);
  const searchedDialogs = useSelector(selectSearchedDialogs);
  const searchedCustoms = useSelector(selectSearchedCustoms);

  return (
    <>
      {searchedDialogs.map((dialog) => (
        <DirectMessageListItem key={dialog._id} user={user} dialog={dialog} />
      ))}
      {searchedConversations.map((conversation) => (
        <Channel key={conversation._id} channel={conversation} />
      ))}
      {searchedCustoms.map((custom) => (
        <SidebarListCreator key={custom} componentName={custom} />
      ))}
    </>
  );
};
