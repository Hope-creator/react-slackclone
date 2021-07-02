import React from "react";
import { IUser } from "../../../store/modules/user/types";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { HeaderRightDialog } from "./Header/HeaderRightDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessages,
  selectMessagesLoadingState,
} from "../../../store/modules/messages/selectors";
import {
  IMessage,
  LoadingMessagesState,
} from "../../../store/modules/messages/types";
import {
  addNewMessage,
  clearMessagesState,
  deleteOneMessage,
  fetchMessagesDialog,
} from "../../../store/modules/messages/messages";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import socket from "../../../services/socket/socket";
import { HeaderLeftDialog } from "./Header/HeaderLeftDialog";
import { DialogContent } from "./Content/DialogContent";
import { DefaultWorkspace } from "../DefaultWorkspace";
import {
  selectCurrentDialogLoadingState,
  selectCurrentDialogPartner,
} from "../../../store/modules/currentDialog/selectors";
import { fetchCurrentDialog } from "../../../store/modules/currentDialog/currentDialog";
import { LoadingCurrentDialogState } from "../../../store/modules/currentDialog/types";

interface IDialogWorkspaceProps {
  user: IUser;
}

export const DialogWorkspace: React.FC<IDialogWorkspaceProps> = ({ user }) => {
  const DialogLoadingState = useSelector(selectCurrentDialogLoadingState);
  const dispatch = useDispatch();
  const history = useHistory();
  const path = history.location.pathname;
  const partner = useSelector(selectCurrentDialogPartner);

  const messages = useSelector(selectMessages);
  const messagesLoadingState = useSelector(selectMessagesLoadingState);

  React.useEffect(() => {
    if (path.match(/^\/d\/\w{24}$/)) {
      const fetchPath = path.split("/d/").slice(1).join("");
      dispatch(fetchCurrentDialog(fetchPath));
    }
    return function clearConversation() {
      dispatch(clearMessagesState());
    };
  }, [path, dispatch]);

  React.useEffect(() => {
    if (partner) {
      dispatch(fetchMessagesDialog(partner._id));
    }
    return function cleanUp() {
      dispatch(clearMessagesState());
    };
  }, [partner, dispatch]);

  const newMessageHandleListener = React.useCallback(
    (message: IMessage) => {
      if (partner)
        if (message.creator._id === partner._id || message.dest === partner._id)
          dispatch(addNewMessage(message));
    },
    [dispatch, partner]
  );

  const deleteMessageHandleListener = React.useCallback(
    (messageId: string) => {
      dispatch(deleteOneMessage(messageId));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (partner && messagesLoadingState === LoadingMessagesState.LOADED) {
      socket.addEventListener(
        "SERVER:NEW_DIRECTMESSAGE",
        newMessageHandleListener
      );
      socket.addEventListener(
        "SERVER:MESSAGE_DELETED",
        deleteMessageHandleListener
      );
    }
    return function clearConnect() {
      socket.removeListener(
        "SERVER:NEW_DIRECTMESSAGE",
        newMessageHandleListener
      );
      socket.removeListener(
        "SERVER:MESSAGE_DELETED",
        deleteMessageHandleListener
      );
    };
  }, [
    partner,
    dispatch,
    messagesLoadingState,
    newMessageHandleListener,
    deleteMessageHandleListener,
  ]);

  if (DialogLoadingState === LoadingCurrentDialogState.LOADING)
    return <CircularProgress />;

  if (DialogLoadingState === LoadingCurrentDialogState.LOADED && partner) {
    return (
      <>
        <WorkspaceHeader
          leftSideContent={<HeaderLeftDialog partner={partner} />}
          rightSideContent={<HeaderRightDialog partner={partner} />}
        />
        <WorkspaceContent
          children={
            <DialogContent user={user} partner={partner} messages={messages} />
          }
        />
      </>
    );
  }

  return <DefaultWorkspace />;
};
