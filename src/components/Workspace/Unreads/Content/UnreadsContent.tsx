import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IMessage } from "../../../../store/modules/messages/types";
import { Message } from "../../../Message/Message";
import { IUser } from "../../../../store/modules/user/types";

export interface IUnreadsContentProps {
  messages: IMessage[];
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export const UnreadsContent: React.FC<IUnreadsContentProps> = ({
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
            <Message user={user} key={message._id} message={message} />
          ))
          .reverse()}
      </Grid>
    </>
  );
};
