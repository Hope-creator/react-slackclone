import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMessage } from "../store/modules/messages/types";
import { fetchReadMessage } from "../store/modules/readMessage/readMessage";
import {
  selectErrorReadMessages,
  selectFetchingReadMessages,
} from "../store/modules/readMessage/selectors";

export interface MarkAsReadButtonProps {
  message: IMessage;
}

const useStyles = makeStyles(() => ({
  errorButton: {
    border: "1px solid red",
    backgroundColor: "pink",
  },
}));

export const MarkAsReadButton: React.FC<MarkAsReadButtonProps> = ({
  message,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isFetching =
    useSelector(selectFetchingReadMessages).findIndex(
      (_message) => _message === message._id
    ) !== -1;
  const isError =
    useSelector(selectErrorReadMessages).findIndex(
      (_message) => _message === message._id
    ) !== -1;

  const handleClick = () => {
    dispatch(fetchReadMessage(message._id));
  };

  if (isFetching) {
    return <CircularProgress size={10} />;
  }
  return (
    <Button
      className={isError ? classes.errorButton : undefined}
      onClick={handleClick}
    >
      Mark as read
    </Button>
  );
};
