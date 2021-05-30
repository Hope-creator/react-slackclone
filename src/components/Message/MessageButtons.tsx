import React from "react";

import IconButton from "@material-ui/core/IconButton";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch } from "react-redux";
import { markMessage, unmarkMessage } from "../../store/modules/currentConversation/currentConversation";

export interface IMessageButtonsProps {
  marked: boolean;
  isMessageOwner: boolean;
  messageId: string;
}

export const MessageButtons: React.FC<IMessageButtonsProps> = ({
  marked,
  isMessageOwner,
  messageId,
}) => {
  const dispatch = useDispatch();

  const mark = () => {
    dispatch(markMessage(messageId));
  };

  const unmark = () => {
    dispatch(unmarkMessage(messageId));
  };

  return (
    <>
      {marked ? (
        <IconButton size="small" onClick={unmark}>
          <BookmarkIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton size="small" onClick={mark}>
          <BookmarkBorderIcon color="primary" />
        </IconButton>
      )}
      {isMessageOwner && (
        <IconButton size="small" onClick={() => console.log("Clear")}>
          <ClearIcon color="primary" />
        </IconButton>
      )}
    </>
  );
};
