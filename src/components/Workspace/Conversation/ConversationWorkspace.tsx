import React from "react";

import {
  LoadingCurrentConversationState,
} from "../../../store/modules/currentConversation/types";
import {
  IMessage,
} from "../../../store/modules/messages/types";
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
} from "../../../store/modules/currentConversation/currentConversation";
import {
  selectCurrentConversation,
  selectCurrentConversationLoadingState,
} from "../../../store/modules/currentConversation/selectors";
import { DirectMessageWorkspace } from "./DirectMessageWorkspace";
import { ChannelWorkspace } from "./ChannelWorkspace";
import { DefaultWorkspace } from "../DefaultWorkspace";

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
    if (path.length === 25) {
      const fetchPath = path.split("").slice(1).join("");
      dispatch(fetchCurrentConversation(fetchPath));
    }
    return function clearConversation() {
      dispatch(clearCurrentConversation());
    };
  }, [path, dispatch]);

  React.useEffect(() => {
    if (conversation && messagesLoadingState === LoadingMessagesState.LOADED) {
      socket.emit("CONVERSATION:JOIN", conversation._id);
      socket.on("SERVER:NEW_MESSAGE", (message: IMessage) => {
        dispatch(addNewMessage(message));
      });
    }
    return function clearConnect() {
      socket.emit("CONVERSATION:LEAVE");
      socket.removeListener("SERVER:NEW_MESSAGE");
    };
  }, [conversation, dispatch, messagesLoadingState]);

  if (
    conversationLoadingState === LoadingCurrentConversationState.LOADED &&
    conversation
  ) {
    return conversation.is_channel ? (
      <ChannelWorkspace user={user} conversation={conversation} />
    ) : (
      <DirectMessageWorkspace user={user} conversation={conversation} />
    );
  }

  return <DefaultWorkspace />;
};
