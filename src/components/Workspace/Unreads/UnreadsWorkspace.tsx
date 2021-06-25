import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { LeftSideUnreads } from "./Header/LeftSideUnreads";
import { RightSideUnreads } from "./Header/RightSideUnreads";
import { UnreadsContent } from "./Content/UnreadsContent";
import { IUser } from "../../../store/modules/user/types";
import socket from "../../../services/socket/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewMessage,
  clearMessagesState,
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

  const handleListener = React.useCallback(
    (message) => {
      dispatch(addNewMessage(message));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (messagesLoadingState === LoadingMessagesState.LOADED) {
      socket.addEventListener("SERVER:NEW_UNREAD", handleListener);
    }
    return function cleanUp() {
      socket.removeEventListener("SERVER:NEW_UNREAD", handleListener);
    };
  }, [handleListener, messagesLoadingState]);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={<LeftSideUnreads unreadsCount={messagesTotalCount} />}
        rightSideContent={<RightSideUnreads messages={messages} />}
      />
      <WorkspaceContent
        children={<UnreadsContent user={user} messages={messages} />}
      />
    </>
  );
};
