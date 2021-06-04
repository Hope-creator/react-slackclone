import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { IConversation } from "../../../store/modules/conversations/types";
import { LeftSideConversationContent } from "./Header/LeftSideConversationContent";
import { RightSideConversationContent } from "./Header/RightSideConversationContent";
import { ConversationContent } from "./Content/ConversationContent";
import { IUser } from "../../../store/modules/user/types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessages,
  selectMessagesLoadingState,
} from "../../../store/modules/messages/selectors";
import { LoadingMessagesState } from "../../../store/modules/messages/types";
import { CircularProgress } from "@material-ui/core";
import { fetchMessagesConversation } from "../../../store/modules/messages/messages";

interface IChannelWorkspaceProps {
  conversation: IConversation;
  user: IUser;
}

export const ChannelWorkspace: React.FC<IChannelWorkspaceProps> = ({
  conversation,
  user,
}) => {
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
          <LeftSideConversationContent conversation={conversation} />
        }
        rightSideContent={
          <RightSideConversationContent conversation={conversation} />
        }
      />
      <WorkspaceContent
        children={
          messagesLoadingState !== LoadingMessagesState.LOADED ? (
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
