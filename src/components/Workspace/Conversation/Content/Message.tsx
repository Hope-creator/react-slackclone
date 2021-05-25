import React from "react";
import { IMessage } from "../../../../store/modules/currentConversation/types";
import { MessagePane } from "../../../MessagePane";
import defaultAvatar from "../../../../images/defaultAvatar.png";

export interface IMessageProps {
  message: IMessage;
}

export const Message: React.FC<IMessageProps> = ({
  message
}: IMessageProps) => {

  return (
    <MessagePane
      header={message.creator.name}
      avatarSrc={message.creator.avatar || defaultAvatar}
      marked={message.marked}
    >
      {message.text}
    </MessagePane>
  );
}