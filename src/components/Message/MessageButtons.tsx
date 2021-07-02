import React from "react";

import IconButton from "@material-ui/core/IconButton";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  markMessage,
  unmarkMessage,
} from "../../store/modules/messages/messages";
import { IUser } from "../../store/modules/user/types";
import { IMessage } from "../../store/modules/messages/types";
import {
  fetchDeleteMessage,
  fetchReadMessage,
} from "../../store/modules/messagesAffect/messagesAffect";
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  selectIsFetchingAffectMessage,
  selectIsErrorAffectMessage,
} from "../../store/modules/messagesAffect/selectors";

export interface IMessageButtonsProps {
  message: IMessage;
  user: IUser;
}

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 100,
  },
  errorButton: {
    border: "1px solid red",
    backgroundColor: "pink",
  },
}));

export const MessageButtons: React.FC<IMessageButtonsProps> = ({
  message,
  user,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isFetching = useSelector(selectIsFetchingAffectMessage(message._id));
  const isError = useSelector(selectIsErrorAffectMessage(message._id));

  const readHandleClick = () => {
    dispatch(fetchReadMessage(message._id));
  };

  const markHandleClick = () => {
    dispatch(markMessage(message._id));
  };

  const unmarkHandleClick = () => {
    dispatch(unmarkMessage(message._id));
  };

  const deleteHandleClick = () => {
    dispatch(fetchDeleteMessage(message._id));
  };

  const isUnread = message.unreadBy.includes(user._id);

  return isFetching ? (
    <CircularProgress size={24} />
  ) : (
    <>
      {message.marked ? (
        <IconButton size="small" onClick={unmarkHandleClick}>
          <BookmarkIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton size="small" onClick={markHandleClick}>
          <BookmarkBorderIcon color="primary" />
        </IconButton>
      )}
      {message.creator._id === user._id && (
        <IconButton size="small" onClick={deleteHandleClick}>
          <ClearIcon color="primary" />
        </IconButton>
      )}
      {isUnread && (
        <Button
          className={isError ? classes.errorButton : classes.button}
          onClick={readHandleClick}
        >
          Mark as read
        </Button>
      )}
    </>
  );
};
