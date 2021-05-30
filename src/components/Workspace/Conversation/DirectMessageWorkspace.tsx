import React from "react";
import { IUser } from "../../../store/modules/user/types";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { useSelector } from "react-redux";
import { IConversation } from "../../../store/modules/conversations/types";
import { LeftSideDMContent } from "./Header/LeftSideDMContent";
import { selectUser } from "../../../store/modules/user/selectors";
import { RightSideDMContent } from "./Header/RightSideDMContent";
import { ConversationContent } from "./Content/ConversationContent";
import { IMessage } from "../../../store/modules/currentConversation/types";

interface IDirectMessageWorkspaceProps {
  conversation: IConversation;
  messages: IMessage[];
}

export const DirectMessageWorkspace: React.FC<IDirectMessageWorkspaceProps> = ({
  conversation,
  messages,
}) => {
  const me = useSelector(selectUser);

  const partner = (conversation.members as IUser[]).filter(
    (user) => user._id !== (me as IUser)._id
  )[0];

  return (
    <>
      <WorkspaceHeader
        leftSideContent={
          <LeftSideDMContent conversation={conversation} partner={partner} />
        }
        rightSideContent={
          <RightSideDMContent partner={partner} />
        }
      />
      <WorkspaceContent
        children={
          <ConversationContent
            conversationId={conversation._id}
            messages={messages}
          />
        }
      />
    </>
  );
};
