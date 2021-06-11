import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { IConversation } from "../store/modules/conversations/types";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentInfoChannel } from "../store/modules/currentInfo_side/currentInfo";
import { selectCurrentInfoItem } from "../store/modules/currentInfo_side/selectors";
import { joinOneConversation } from "../store/modules/conversations/conversations";

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
}));

export const ViewConversationBlock: React.FC<IViewConversationBlockBox> = ({
  conversation,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const conversationDetail = useSelector(
    selectCurrentInfoItem
  ) as IConversation;

  const handleJoinClick = () => {
    dispatch(joinOneConversation(conversation._id));
  };

  const handleDetailsClick = () => {
    dispatch(fetchCurrentInfoChannel(conversation._id));
  };

  return (
    <Box bgcolor="rgba(28,28,28,.03)" padding="40px" textAlign="center">
      <Typography className={classes.name} variant="subtitle2">
        You are viewing #{conversation.name}
      </Typography>
      <Button
        onClick={handleJoinClick}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Join Channel
      </Button>
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
