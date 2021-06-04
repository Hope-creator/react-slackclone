import React from "react";
import { IMessage } from "../../store/modules/messages/types";
import { MessagePane } from "./MessagePane";
import { MessageFilesBox } from "./MessageFilesBox";
import { Typography } from "@material-ui/core";
import { IUser } from "../../store/modules/user/types";

export interface IMessageProps {
  message: IMessage;
  user: IUser;
}

export const Message: React.FC<IMessageProps> = ({
  message,
  user,
}: IMessageProps) => {
  return (
    <MessagePane message={message} user={user}>
      <Typography>{message.text}</Typography>
      {message.attachments.length > 0 && (
        <MessageFilesBox files={message.attachments} />
      )}
    </MessagePane>
  );
};
