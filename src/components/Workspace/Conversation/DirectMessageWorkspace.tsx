import React from "react";
import { IUser } from "../../../store/modules/user/types";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { IConversation } from "../../../store/modules/conversations/types";
import { LeftSideDMContent } from "./Header/LeftSideDMContent";
import { RightSideDMContent } from "./Header/RightSideDMContent";
import { ConversationContent } from "./Content/ConversationContent";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessages,
  selectMessagesLoadingState,
} from "../../../store/modules/messages/selectors";
import { LoadingMessagesState } from "../../../store/modules/messages/types";
import { fetchMessagesConversation } from "../../../store/modules/messages/messages";
import { CircularProgress } from "@material-ui/core";

interface IDirectMessageWorkspaceProps {
  conversation: IConversation;
  user: IUser;
}

export const DirectMessageWorkspace: React.FC<IDirectMessageWorkspaceProps> = ({
  conversation,
  user,
}) => {
  const partner = (conversation.members as IUser[]).filter(
    (_user) => _user._id !== user._id
  )[0];

  const messages = useSelector(selectMessages);
  const messagesLoadingState = useSelector(selectMessagesLoadingState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchMessagesConversation(conversation._id));
  }, [conversation, dispatch]);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={
          <LeftSideDMContent conversation={conversation} partner={partner} />
        }
        rightSideContent={<RightSideDMContent partner={partner} />}
      />
      <WorkspaceContent
        children={
          messagesLoadingState === LoadingMessagesState.LOADING ? (
            <CircularProgress />
          ) : (
            <ConversationContent
              user={user}
              conversationId={conversation._id}
              messages={messages}
            />
          )
        }
      />
    </>
  );
};
