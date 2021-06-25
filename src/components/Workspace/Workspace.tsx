import React from "react";
import { useHistory } from "react-router";
import { IUser } from "../../store/modules/user/types";
import { AllDMWorkspace } from "./AllDM/AllDMWorkspace";
import { ConversationWorkspace } from "./Conversation/ConversationWorkspace";
import { ConversationsWorkspace } from "./Conversations/ConversationsWorkspace";
import { DefaultWorkspace } from "./DefaultWorkspace";
import { DMWorkspace } from "./DM/DMWorkspace";
import { MarkedWorkspace } from "./Marked/MarkedWorkspace";
import { UsersWorkspace } from "./Members/UsersWorkspace";
import { UnreadsWorkspace } from "./Unreads/UnreadsWorkspace";

export interface IWorkspaceProps {
  user: IUser;
}

export const Workspace: React.FC<IWorkspaceProps> = ({ user }) => {
  const history = useHistory();
  const path = history.location.pathname;

  if (path.match(/^\/\w{24}$/)) {
    return <ConversationWorkspace user={user} />;
  }

  if (path.match(/^\/d\/\w{24}$/)) {
    return <DMWorkspace user={user} />;
  }

  if (path.match(/^\/members$/)) {
    return <UsersWorkspace />;
  }

  if (path.match(/^\/all-dialogs$/)) {
    return <AllDMWorkspace user={user} />;
  }

  if (path.match(/^\/browse-channels$/)) {
    return <ConversationsWorkspace user={user} />;
  }

  if (path.match(/^\/unreads$/)) {
    return <UnreadsWorkspace user={user} />;
  }

  if (path.match(/^\/saved-page$/)) {
    return <MarkedWorkspace user={user} />;
  }

  return <DefaultWorkspace />;
};
