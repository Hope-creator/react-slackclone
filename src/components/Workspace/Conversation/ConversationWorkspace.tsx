import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { IConversation } from "../../../store/modules/conversations/types";
import { LeftSideConversationContent } from "./Header/LeftSideConversationContent";
import { RightSideConversationContent } from "./Header/RightSideConversationContent";
import { ConversationContent } from "./Content/ConversationContent";
import { IMessage } from "../../../store/modules/currentConversation/types";

interface IConversationWorkspaceProps {
  conversation: IConversation;
  messages: IMessage[];
}

export const ConversationWorkspace: React.FC<IConversationWorkspaceProps> = ({
  conversation,
  messages,
}) => {
  return (
    <>
      <WorkspaceHeader
        leftSideContent={
          <LeftSideConversationContent conversation={conversation} />
        }
        rightSideContent={
          <RightSideConversationContent conversation={conversation} />
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
