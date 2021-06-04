import React from "react";

import IconButton from "@material-ui/core/IconButton";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch } from "react-redux";
import {
  markMessage,
  unmarkMessage,
} from "../../store/modules/messages/messages";
import { IUser } from "../../store/modules/user/types";
import { MarkAsReadButton } from "../MarkAsReadButton";
import { IMessage } from "../../store/modules/messages/types";

export interface IMessageButtonsProps {
  message: IMessage;
  user: IUser;
}

export const MessageButtons: React.FC<IMessageButtonsProps> = ({
  message,
  user,
}) => {
  const dispatch = useDispatch();

  const mark = () => {
    dispatch(markMessage(message._id));
  };

  const unmark = () => {
    dispatch(unmarkMessage(message._id));
  };

  const isUnread = message.unreadBy.includes(user._id);

  return (
    <>
      {message.marked ? (
        <IconButton size="small" onClick={unmark}>
          <BookmarkIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton size="small" onClick={mark}>
          <BookmarkBorderIcon color="primary" />
        </IconButton>
      )}
      {message.creator._id === user._id && (
        <IconButton size="small" onClick={() => console.log("Clear")}>
          <ClearIcon color="primary" />
        </IconButton>
      )}
      {isUnread && (
        <MarkAsReadButton message={message}>Mark as read</MarkAsReadButton>
      )}
    </>
  );
};
