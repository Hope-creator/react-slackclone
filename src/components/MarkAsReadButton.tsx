import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMessage } from "../store/modules/messages/types";
import { fetchReadMessage } from "../store/modules/messagesAffect/messagesAffect";
import {
  selectIsFetchingAffectMessage,
  selectIsErrorAffectMessage,
} from "../store/modules/messagesAffect/selectors";

export interface MarkAsReadButtonProps {
  message: IMessage;
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

export const MarkAsReadButton: React.FC<MarkAsReadButtonProps> = ({
  message,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isFetching = useSelector(selectIsFetchingAffectMessage(message._id));
  const isError = useSelector(selectIsErrorAffectMessage(message._id));

  const handleClick = () => {
    dispatch(fetchReadMessage(message._id));
  };

  if (isFetching) {
    return <CircularProgress size={10} />;
  }
  return (
    <Button
      className={isError ? classes.errorButton : classes.button}
      onClick={handleClick}
    >
      Mark as read
    </Button>
  );
};
