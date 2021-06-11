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
  addMemberCurrentConversation,
  clearCurrentConversation,
  fetchCurrentConversation,
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

  const newMemberHandleListener = React.useCallback(
    (member: string) => {
      dispatch(addMemberCurrentConversation());
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (
      conversation &&
      conversationLoadingState === LoadingCurrentConversationState.LOADED
    ) {
      socket.on("SERVER:NEW_MEMBER", newMemberHandleListener);
    }
    return function clearConnect() {
      socket.removeListener("SERVER:NEW_MEMBER", newMemberHandleListener);
    };
  }, [
    conversation,
    dispatch,
    messagesLoadingState,
    newMemberHandleListener,
    conversationLoadingState,
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
    return  (<>
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
          <ConversationContent
            user={user}
            conversation={conversation}
          />}
    />
  </>)
  }
  return <DefaultWorkspace />;
};
