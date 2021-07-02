import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { HeaderLeftMarked } from "./Header/HeaderLeftMarked";
import { IUser } from "../../../store/modules/user/types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessagesState,
  deleteOneMessage,
  fetchMessagesMarked,
} from "../../../store/modules/messages/messages";
import {
  selectIsMessagesLoaded,
  selectMarkedMessages,
} from "../../../store/modules/messages/selectors";
import { MarkedContent } from "./Content/MarkedContent";
import socket from "../../../services/socket/socket";

interface IMarkedWorkspaceProps {
  user: IUser;
}

export const MarkedWorkspace: React.FC<IMarkedWorkspaceProps> = ({ user }) => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMarkedMessages);
  const isMessagesLoaded = useSelector(selectIsMessagesLoaded);

  React.useEffect(() => {
    dispatch(fetchMessagesMarked());

    return function clearMessages() {
      dispatch(clearMessagesState());
    };
  }, [dispatch]);

  const deleteMessageHandleListener = React.useCallback(
    (messageId: string) => {
      dispatch(deleteOneMessage(messageId));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (isMessagesLoaded) {
      socket.addEventListener(
        "SERVER:MESSAGE_DELETED",
        deleteMessageHandleListener
      );
    }
    return function clearConnect() {
      socket.removeListener(
        "SERVER:MESSAGE_DELETED",
        deleteMessageHandleListener
      );
    };
  }, [deleteMessageHandleListener, isMessagesLoaded]);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={<HeaderLeftMarked />}
        rightSideContent={<></>}
      />
      <WorkspaceContent
        children={<MarkedContent user={user} messages={messages} />}
      />
    </>
  );
};
