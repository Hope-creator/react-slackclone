import React from "react";

import { LoadingCurrentConversationState } from "../../../store/modules/currentConversation/types";
import { IMessage } from "../../../store/modules/messages/types";
import { IUser } from "../../../store/modules/user/types";
import { useDispatch, useSelector } from "react-redux";
import { selectMessagesLoadingState } from "../../../store/modules/messages/selectors";
import { LoadingMessagesState } from "../../../store/modules/messages/types";
import socket from "../../../services/socket/socket";
import { addNewMessage } from "../../../store/modules/messages/messages";
import { useHistory } from "react-router";
import {
  clearCurrentConversation,
  fetchCurrentConversation,
  updateCurrentConversation,
} from "../../../store/modules/currentConversation/currentConversation";
import {
  selectCurrentConversation,
  selectCurrentConversationLoadingState,
} from "../../../store/modules/currentConversation/selectors";
import { DefaultWorkspace } from "../DefaultWorkspace";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { LeftSideConversationContent } from "./Header/LeftSideConversationContent";
import { RightSideConversationContent } from "./Header/RightSideConversationContent";
import { WorkspaceContent } from "../WorkspaceContent";
import { ConversationContent } from "./Content/ConversationContent";
import { IConversation } from "../../../store/modules/conversations/types";

interface IConversationWorkspaceProps {
  user: IUser;
}

export const ConversationWorkspace: React.FC<IConversationWorkspaceProps> = ({
  user,
}) => {
  const messagesLoadingState = useSelector(selectMessagesLoadingState);
  const dispatch = useDispatch();
  const history = useHistory();
  const path = history.location.pathname;
  const conversation = useSelector(selectCurrentConversation);
  const conversationLoadingState = useSelector(
    selectCurrentConversationLoadingState
  );

  React.useEffect(() => {
    if (path.match(/^\/\w{24}$/)) {
      const fetchPath = path.split("").slice(1).join("");
      dispatch(fetchCurrentConversation(fetchPath));
    }
    return function clearConversation() {
      dispatch(clearCurrentConversation());
    };
  }, [path, dispatch]);

  const newMessageHandleListener = React.useCallback(
    (message: IMessage) => {
      dispatch(addNewMessage(message));
    },
    [dispatch]
  );

  const conversationUpdateHandleListener = React.useCallback(
    (_conversation: IConversation) => {
      if (conversation && conversation._id === _conversation._id) {
        dispatch(updateCurrentConversation(_conversation));
      }
    },
    [dispatch, conversation]
  );

  React.useEffect(() => {
    if (
      conversation &&
      conversationLoadingState === LoadingCurrentConversationState.LOADED
    ) {
      socket.on("SERVER:CONVERSATION_UPDATE", conversationUpdateHandleListener);
    }
    return function clearConnect() {
      socket.removeListener("SERVER:CONVERSATION_UPDATE", conversationUpdateHandleListener);
    };
  }, [
    conversation,
    dispatch,
    messagesLoadingState,
    conversationLoadingState,
    conversationUpdateHandleListener
  ]);

  React.useEffect(() => {
    if (conversation && messagesLoadingState === LoadingMessagesState.LOADED) {
      socket.emit("CONVERSATION:JOIN", conversation._id);
      socket.on("SERVER:NEW_MESSAGE", newMessageHandleListener);
    }
    return function clearConnect() {
      socket.emit("CONVERSATION:LEAVE");
      socket.removeListener("SERVER:NEW_MESSAGE", newMessageHandleListener);
    };
  }, [conversation, dispatch, messagesLoadingState, newMessageHandleListener]);

  if (
    conversationLoadingState === LoadingCurrentConversationState.LOADED &&
    conversation
  ) {
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
            <ConversationContent user={user} conversation={conversation} />
          }
        />
      </>
    );
  }
  return <DefaultWorkspace />;
};
