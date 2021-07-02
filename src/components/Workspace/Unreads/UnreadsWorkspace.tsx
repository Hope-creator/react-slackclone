import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { HeaderLeftUnreads } from "./Header/HeaderLeftUnreads";
import { HeaderRightUnreads } from "./Header/HeaderRightUnreads";
import { UnreadsContent } from "./Content/UnreadsContent";
import { IUser } from "../../../store/modules/user/types";
import socket from "../../../services/socket/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewMessage,
  clearMessagesState,
  deleteOneMessage,
  fetchMessagesUnread,
} from "../../../store/modules/messages/messages";
import {
  selectMessages,
  selectMessagesLoadingState,
  selectMessagesTotalCount,
} from "../../../store/modules/messages/selectors";
import { LoadingMessagesState } from "../../../store/modules/messages/types";

interface IUnreadsWorkspaceProps {
  user: IUser;
}

export const UnreadsWorkspace: React.FC<IUnreadsWorkspaceProps> = ({
  user,
}) => {
  const dispatch = useDispatch();
  const messagesLoadingState = useSelector(selectMessagesLoadingState);
  const messages = useSelector(selectMessages);
  const messagesTotalCount = useSelector(selectMessagesTotalCount);

  React.useEffect(() => {
    dispatch(fetchMessagesUnread());

    return function clearMembers() {
      dispatch(clearMessagesState());
    };
  }, [dispatch]);

  const newUnreadHandleListener = React.useCallback(
    (message) => {
      dispatch(addNewMessage(message));
    },
    [dispatch]
  );

  const deleteMessageHandleListener = React.useCallback(
    (messageId: string) => {
      dispatch(deleteOneMessage(messageId));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (messagesLoadingState === LoadingMessagesState.LOADED) {
      socket.addEventListener("SERVER:NEW_UNREAD", newUnreadHandleListener);
      socket.addEventListener(
        "SERVER:MESSAGE_DELETED",
        deleteMessageHandleListener
      );
    }
    return function cleanUp() {
      socket.removeEventListener("SERVER:NEW_UNREAD", newUnreadHandleListener);
      socket.removeEventListener(
        "SERVER:MESSAGE_DELETED",
        deleteMessageHandleListener
      );
    };
  }, [
    newUnreadHandleListener,
    messagesLoadingState,
    deleteMessageHandleListener,
  ]);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={
          <HeaderLeftUnreads
            unreadsCount={
              messagesLoadingState === LoadingMessagesState.LOADED
                ? messagesTotalCount
                : 0
            }
          />
        }
        rightSideContent={<HeaderRightUnreads messages={messages} />}
      />
      <WorkspaceContent
        children={<UnreadsContent user={user} messages={messages} />}
      />
    </>
  );
};
