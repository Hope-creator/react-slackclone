import React from "react";
import { useSelector } from "react-redux";
import {
  selectSearchedConversations,
  selectSearchedCustoms,
  selectSearchedUsers,
} from "../store/modules/search/selectors";
import { DirectMessageListItem } from "./DirectMessageListItem";
import { IUser } from "../store/modules/user/types";
import { Channel } from "./Channel";
import { SidebarListCreator } from "../functions/SidebarListCreator";

interface ISearchCompanyContentProps {
  me: IUser;
}

export const SearchCompanyContent: React.FC<ISearchCompanyContentProps> = ({
  me,
}) => {
  const searchedConversations = useSelector(selectSearchedConversations);
  const searchedUsers = useSelector(selectSearchedUsers);
  const searchedCustoms = useSelector(selectSearchedCustoms);

  return (
    <>
      {searchedUsers.map((user) => (
        <DirectMessageListItem key={user._id} user={user} me={me} />
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
