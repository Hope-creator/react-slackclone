import React from "react";
import { IUser } from "../../../store/modules/user/types";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { RighHeaderDM } from "./Header/RighHeaderDM";
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
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import socket from "../../../services/socket/socket";
import { LeftHeaderDM } from "./Header/LeftHeaderDM";
import { DMContent } from "./Content/DMContent";
import { DefaultWorkspace } from "../DefaultWorkspace";
import {
  selectCurrentDMLoadingState,
  selectCurrentDMPartner,
} from "../../../store/modules/currentDM/selectors";
import { fetchCurrentDM } from "../../../store/modules/currentDM/currentDM";
import { LoadingCurrentDMState } from "../../../store/modules/currentDM/types";

interface IDMWorkspaceProps {
  user: IUser;
}

export const DMWorkspace: React.FC<IDMWorkspaceProps> = ({ user }) => {
  const DMLoadingState = useSelector(selectCurrentDMLoadingState);
  const dispatch = useDispatch();
  const history = useHistory();
  const path = history.location.pathname;
  const partner = useSelector(selectCurrentDMPartner);

  const messages = useSelector(selectMessages);
  const messagesLoadingState = useSelector(selectMessagesLoadingState);

  React.useEffect(() => {
    if (path.match(/^\/d\/\w{24}$/)) {
      const fetchPath = path.split("/d/").slice(1).join("");
      dispatch(fetchCurrentDM(fetchPath));
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
      if(partner)
      if(message.creator._id === partner._id || message.dest === partner._id)
      dispatch(addNewMessage(message));
    },
    [dispatch, partner]
  );

  React.useEffect(() => {
    if (partner && messagesLoadingState === LoadingMessagesState.LOADED) {
      socket.on("SERVER:NEW_DIRECTMESSAGE", newMessageHandleListener);
    }
    return function clearConnect() {
      socket.removeListener(
        "SERVER:NEW_DIRECTMESSAGE",
        newMessageHandleListener
      );
    };
  }, [partner, dispatch, messagesLoadingState, newMessageHandleListener]);

  if (DMLoadingState === LoadingCurrentDMState.LOADING)
    return <CircularProgress />;

  if (DMLoadingState === LoadingCurrentDMState.LOADED && partner) {
    return (
      <>
        <WorkspaceHeader
          leftSideContent={<LeftHeaderDM partner={partner} />}
          rightSideContent={<RighHeaderDM partner={partner} />}
        />
        <WorkspaceContent
          children={
              <DMContent user={user} partner={partner} messages={messages} />
          }
        />
      </>
    );
  }

  return <DefaultWorkspace />;
};
