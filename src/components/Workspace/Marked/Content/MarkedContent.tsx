import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IMessage } from "../../../../store/modules/messages/types";
import { Message } from "../../../Message/Message";
import { IUser } from "../../../../store/modules/user/types";
import Box from "@material-ui/core/Box";

export interface IUnreadsContentProps {
  messages: IMessage[];
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageWrapper:{
      margin: 10,
      border: "1px solid #e6e6e6",
      borderRadius: 10
    },
    workspaceContentMessages: {
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(29,28,29,.52)",
        borderRadius: "4px",
      },
    },
  })
);

export const MarkedContent: React.FC<IUnreadsContentProps> = ({
  messages,
  user,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        item
        className={classes.workspaceContentMessages}
        direction="column"
        wrap="nowrap"
      >
        {messages
          .map((message) => (
            <Box className={classes.messageWrapper}>
            <Message user={user} key={message._id} message={message} />
            </Box>
          ))}
      </Grid>
    </>
  );
};
