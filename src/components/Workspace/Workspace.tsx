import React from "react";
import { useHistory } from "react-router";
import { IUser } from "../../store/modules/user/types";
import { AlldialogsWorkspace } from "./Alldialogs/AlldialogsWorkspace";
import { ConversationWorkspace } from "./Conversation/ConversationWorkspace";
import { ConversationsWorkspace } from "./Conversations/ConversationsWorkspace";
import { DefaultWorkspace } from "./DefaultWorkspace";
import { DialogWorkspace } from "./Dialog/DialogWorkspace";
import { MarkedWorkspace } from "./Marked/MarkedWorkspace";
import { MembersWorkspace } from "./Members/MembersWorkspace";
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
    return <DialogWorkspace user={user} />;
  }

  if (path.match(/^\/members$/)) {
    return <MembersWorkspace />;
  }

  if (path.match(/^\/all-dialogs$/)) {
    return <AlldialogsWorkspace user={user} />;
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
