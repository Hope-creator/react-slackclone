import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { IUser } from "../../../store/modules/user/types";
import { useSelector } from "react-redux";
import { ConversationsContent } from "./Content/ConversationsContent";
import { Typography, Button } from "@material-ui/core";
import { CreateConversationModal } from "../../CreateConversationlModal";
import { selectCurrentConversations } from "../../../store/modules/currentConversations/selectors";

interface IConversationsWorkspaceProps {
  user: IUser;
}

export const ConversationsWorkspace: React.FC<IConversationsWorkspaceProps> = ({
  user,
}) => {
  const conversations = useSelector(selectCurrentConversations);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={
          <Typography variant="subtitle2" color="initial">
            Channel browser
          </Typography>
        }
        rightSideContent={
          <CreateConversationModal
            opener={<Button variant="outlined">Create channel</Button>}
          />
        }
      />
      <WorkspaceContent
        children={
          <ConversationsContent user={user} conversations={conversations} />
        }
      />
    </>
  );
};
