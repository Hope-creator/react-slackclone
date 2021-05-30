import React from "react";
import { IMessage } from "../../store/modules/currentConversation/types";
import { MessagePane } from "./MessagePane";
import defaultAvatar from "../../images/defaultAvatar.png";
import { MessageFilesBox } from "./MessageFilesBox";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/modules/user/selectors";
import { Typography } from "@material-ui/core";

export interface IMessageProps {
  message: IMessage;
}

export const Message: React.FC<IMessageProps> = ({
  message,
}: IMessageProps) => {
  const user = useSelector(selectUser);

  return (
    <MessagePane
      header={message.creator.name}
      avatarSrc={message.creator.avatar || defaultAvatar}
      marked={message.marked}
      time={message.createdAt}
      isMessageOwner={message.creator._id === user?._id}
      messageId={message._id}
    >
      <Typography>{message.text}</Typography>
      {message.attachments.length > 0 && (
        <MessageFilesBox files={message.attachments} />
      )}
    </MessagePane>
  );
};
