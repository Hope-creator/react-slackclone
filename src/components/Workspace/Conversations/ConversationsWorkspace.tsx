import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { IUser } from "../../../store/modules/user/types";
import { useSelector } from "react-redux";
import { ConversationsContent } from "./Content/ConversationsContent";
import { Typography, Button } from "@material-ui/core";
import { CreateConversationModal } from "../../CreateConversationlModal";
import {
  selectCurrentConversationsLoadingState,
  selectCurrentConversations,
} from "../../../store/modules/currentConversations/selectors";
import { selectConversations } from "../../../store/modules/conversations/selectors";
import { LoadingCurrentConversationsState } from "../../../store/modules/currentConversations/types";

interface IConversationsWorkspaceProps {
  user: IUser;
}

export const ConversationsWorkspace: React.FC<IConversationsWorkspaceProps> = ({
  user,
}) => {
  /*
   * On mount select existing conversations from state
   * but if filter text field used load new filtered conversations
   */

  const conversations = useSelector(selectConversations);
  const conversationsWithFilter = useSelector(selectCurrentConversations);
  const withFilterLoadingState = useSelector(
    selectCurrentConversationsLoadingState
  );

  return (
    <>
      <WorkspaceHeader
        leftSideContent={
          <Typography variant="subtitle2" color="initial">
            Channel browser
          </Typography>
        }
        rightSideContent={
          <CreateConversationModal opener={<Button variant="outlined">Create channel</Button>} />
        }
      />
      <WorkspaceContent
        children={
          <ConversationsContent
            user={user}
            conversations={
              withFilterLoadingState === LoadingCurrentConversationsState.LOADED
                ? conversationsWithFilter
                : conversations
            }
          />
        }
      />
    </>
  );
};
