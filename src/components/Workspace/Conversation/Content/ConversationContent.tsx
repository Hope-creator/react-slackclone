import React from "react";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IMessage } from "../../../../store/modules/currentConversation/types";
import { Message } from "./Message";

export interface IConversationContentProps {
  messages: IMessage[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textareaSize: {
      resize: "none",
      width: "100%",
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
    textareaBlock: {
      marginTop: "auto",
    },
  })
);

export const ConversationContent: React.FC<IConversationContentProps> = ({
  messages,
}: IConversationContentProps) => {
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
        {messages.map((message) => (
          <Message message={message} />
        ))}
      </Grid>
      <Grid className={classes.textareaBlock} item>
        <TextareaAutosize
          aria-label="Send message"
          placeholder="Send message to Me"
          className={classes.textareaSize}
        />
      </Grid>
    </>
  );
};
