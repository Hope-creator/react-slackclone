import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../../store/modules/user/selectors";
import { ConversationWorkspace } from "./Conversation/ConversationWorkspace";
import { DefaultWorkspace } from "./DefaultWorkspace";
import { MembersWorkspace } from "./Members/MembersWorkspace";
import { UnreadsWorkspace } from "./Unreads/UnreadsWorkspace";

export const Workspace = () => {
  const history = useHistory();
  const path = history.location.pathname;
  const user = useSelector(selectUser);

  if (user && path.length === 25) {
    return <ConversationWorkspace user={user} />;
  }

  if (user && path.match("members")) {
    return <MembersWorkspace />;
  }

  if (user && path.match("unreads")) {
    return <UnreadsWorkspace user={user} />;
  }

  return <DefaultWorkspace />;
};
