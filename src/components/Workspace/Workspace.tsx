import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import socket from "../../services/socket/socket";
import {
  addNewMessage,
  clearCurrentConversation,
  fetchCurrentConversation,
} from "../../store/modules/currentConversation/currentConversation";
import {
  selectCurrentConversation,
  selectCurrentConversationLoadingState,
  selectMessages,
} from "../../store/modules/currentConversation/selectors";
import { IMessage, LoadingCurrentConversationState } from "../../store/modules/currentConversation/types";
import {
  clearCurrentMembers,
  fetchCurrentMembers,
} from "../../store/modules/currentMembers/currentMembers";
import {
  selectCurrentMembers,
  selectCurrentMembersLoadingState,
} from "../../store/modules/currentMembers/selectors";
import { LoadingCurrentMembersState } from "../../store/modules/currentMembers/types";
import { ConversationContent } from "./Conversation/Content/ConversationContent";
import { LeftSideConversationContent } from "./Conversation/Header/LeftSideConversationContent";
import { RightSideConversationContent } from "./Conversation/Header/RightSideConversationContent";
import { MembersContent } from "./Members/Content/MembersContent";
import { WorkspaceContent } from "./WorkspaceContent";
import { WorkspaceHeader } from "./WorkspaceHeader";

export const Workspace = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const path = history.location.pathname;
  const messages = useSelector(selectMessages);
  const currentConversation = useSelector(selectCurrentConversation);
  const currentMembers = useSelector(selectCurrentMembers);
  const currentMembersLoadingState = useSelector(
    selectCurrentMembersLoadingState
  );
  const currentConversationLoadingState = useSelector(
    selectCurrentConversationLoadingState
  );

  React.useEffect(() => {
    if (currentConversation) {
      socket.emit("CONVERSATION:JOIN", currentConversation._id);
      socket.on("SERVER:NEW_MESSAGE", (message: IMessage) => {
        console.log(message)
        dispatch(addNewMessage(message))
      });
    }
    return function clearConnect() {
      socket.emit("CONVERSATION:LEAVE");
      socket.removeListener("SERVER:NEW_MESSAGE");
      
    };
  }, [currentConversation, dispatch]);

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
    if (path.match("members")) {
      dispatch(fetchCurrentMembers());
    }
    return function clearMembers() {
      dispatch(clearCurrentMembers());
    };
  }, [path, dispatch]);

  if (
    currentConversation &&
    messages &&
    currentConversationLoadingState === LoadingCurrentConversationState.LOADED
  ) {
    return (
      <>
        <WorkspaceHeader
          leftSideContent={
            <LeftSideConversationContent conversation={currentConversation} />
          }
          rightSideContent={
            <RightSideConversationContent conversation={currentConversation} />
          }
        />
        <WorkspaceContent
          children={<ConversationContent messages={messages} />}
        />
      </>
    );
  }

  if (
    currentMembers &&
    currentMembersLoadingState === LoadingCurrentMembersState.LOADED
  ) {
    return (
      <>
        <WorkspaceHeader
          leftSideContent={
            <>
              <Typography variant="h6">People</Typography>
              <Typography variant="caption">
                {currentMembers.length} members
              </Typography>
            </>
          }
          rightSideContent={
            <>
              <Button>Invite people</Button>
            </>
          }
        />
        <WorkspaceContent
          children={<MembersContent members={currentMembers} />}
        />
      </>
    );
  }

  return (
    <>
      <WorkspaceHeader />
      <WorkspaceContent />
    </>
  );
};
