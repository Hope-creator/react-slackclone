import React from "react";
import { IUser } from "../../../store/modules/user/types";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { RightSideDMContent } from "./Header/RightSideDialogContent";
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
  fetchMessagesDialog,
} from "../../../store/modules/messages/messages";
import { CentralCircularProgress } from "../../CentralCircularProgress";
import { CircularProgress } from "@material-ui/core";
import {
  clearCurrentDialog,
  fetchCurrentDialog,
} from "../../../store/modules/currentDialog/currentDialog";
import {
  selectCurrentDialog,
  selectCurrentDialogLoadingState,
} from "../../../store/modules/currentDialog/selectors";
import { useHistory } from "react-router-dom";
import socket from "../../../services/socket/socket";
import { LoadingCurrentDialogState } from "../../../store/modules/currentDialog/types";
import { LeftSideDialogContent } from "./Header/LeftSideDialogContent";
import { DialogWContent } from "./Content/DialogWContent";
import { DefaultWorkspace } from "../DefaultWorkspace";

interface IDialogWorkspaceProps {
  user: IUser;
}

export const DialogWorkspace: React.FC<IDialogWorkspaceProps> = ({ user }) => {
  const dialogLoadingState = useSelector(selectCurrentDialogLoadingState);
  const dispatch = useDispatch();
  const history = useHistory();
  const path = history.location.pathname;
  const dialog = useSelector(selectCurrentDialog);

  const messages = useSelector(selectMessages);
  const messagesLoadingState = useSelector(selectMessagesLoadingState);

  React.useEffect(() => {
    if (path.match(/^\/d\/\w{24}$/)) {
      const fetchPath = path.split("/d/").slice(1).join("");
      dispatch(fetchCurrentDialog(fetchPath));
    }
    return function clearConversation() {
      dispatch(clearCurrentDialog());
    };
  }, [path, dispatch]);

  React.useEffect(() => {
    if (dialog) {
      dispatch(fetchMessagesDialog(dialog._id));
    }
    return function cleanUp() {
      dispatch(clearMessagesState());
    };
  }, [dialog, dispatch]);

  const newMessageHandleListener = React.useCallback(
    (message: IMessage) => {
      dispatch(addNewMessage(message));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (dialog && messagesLoadingState === LoadingMessagesState.LOADED) {
      socket.emit("DIALOG:JOIN", dialog._id);
      socket.on("SERVER:NEW_DIRECTMESSAGE", newMessageHandleListener);
    }
    return function clearConnect() {
      socket.emit("DIALOG:LEAVE");
      socket.removeListener(
        "SERVER:NEW_DIRECTMESSAGE",
        newMessageHandleListener
      );
    };
  }, [dialog, dispatch, messagesLoadingState, newMessageHandleListener]);

  if (dialogLoadingState === LoadingCurrentDialogState.LOADING)
    return <CircularProgress />;

  if (dialogLoadingState === LoadingCurrentDialogState.LOADED && dialog) {
    const partner =
      dialog.creator._id !== user._id ? dialog.creator : dialog.partner;

    return (
      <>
        <WorkspaceHeader
          leftSideContent={<LeftSideDialogContent partner={partner} />}
          rightSideContent={<RightSideDMContent partner={partner} />}
        />
        <WorkspaceContent
          children={
            messagesLoadingState === LoadingMessagesState.LOADING ? (
              <CentralCircularProgress />
            ) : (
              <DialogWContent user={user} dialog={dialog} messages={messages} />
            )
          }
        />
      </>
    );
  }

  return <DefaultWorkspace />;
};
