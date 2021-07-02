import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { IConversation } from "../store/modules/conversations/types";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfoSideChannel } from "../store/modules/infoSide/infoSide";
import { selectInfoSideItem } from "../store/modules/infoSide/selectors";
import { fetchJoinOneConversation } from "../store/modules/conversationsAccess/conversationsAccess";
import {
  selectIsConversationsAccessFetching,
  selectIsConversationsAccessError,
} from "../store/modules/conversationsAccess/selectors";
import { CircularProgress } from "@material-ui/core";

interface IViewConversationBlockBox {
  conversation: IConversation;
}

const useStyles = makeStyles(() => ({
  name: {
    margin: "0 auto",
    width: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "20px",
  },
  button: {
    margin: "0 10px",
  },
  buttonError: {
    margin: "0 10px",
    backgroundColor: "#ca213ef5",
  },
}));

export const ViewConversationBlock: React.FC<IViewConversationBlockBox> = ({
  conversation,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const conversationDetail = useSelector(selectInfoSideItem) as IConversation;

  const isJoinFetching = useSelector(
    selectIsConversationsAccessFetching(conversation._id)
  );
  const isJoinError = useSelector(
    selectIsConversationsAccessError(conversation._id)
  );

  const handleJoinClick = () => {
    dispatch(fetchJoinOneConversation(conversation._id));
  };

  const handleDetailsClick = () => {
    dispatch(fetchInfoSideChannel(conversation._id));
  };

  return (
    <Box bgcolor="rgba(28,28,28,.03)" padding="40px" textAlign="center">
      <Typography className={classes.name} variant="subtitle2">
        You are viewing #{conversation.name}
      </Typography>
      {isJoinFetching ? (
        <CircularProgress size={20} />
      ) : (
        <Button
          onClick={handleJoinClick}
          className={isJoinError ? classes.buttonError : classes.button}
          variant="contained"
          color="primary"
        >
          Join Channel
        </Button>
      )}
      {!conversationDetail || conversationDetail._id !== conversation._id ? (
        <Button
          onClick={handleDetailsClick}
          className={classes.button}
          variant="outlined"
        >
          See More Details
        </Button>
      ) : null}
    </Box>
  );
};
