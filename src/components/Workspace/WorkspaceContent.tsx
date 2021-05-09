import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { MessagePane } from "../MessagePane";
import { IMessage } from "../../store/modules/messages/types";


interface IWorkspaceContentProps {
  messages?: IMessage[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textareaSize: {
      resize: "none",
      width: "100%",
    },
    workspaceContentGrid: {
      height: "calc(100% - 64px)",
      padding: "0 20px",
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
      marginTop: "auto"
    }
  })
);

export const WorkspaceContent: React.FC<IWorkspaceContentProps> = ({
  messages,
}: IWorkspaceContentProps) => {
  const classes = useStyles();

  const messageCreator =
    messages &&
    messages.map((message) => (
      <MessagePane
        header={message.creator.name}
        avatarSrc={message.creator.avatar}
      >
        {message.text}
      </MessagePane>
    ));

  return (
    <Grid
      container
      direction="column"
      className={classes.workspaceContentGrid}
      wrap="nowrap"
    >
      <Grid
        container
        item
        className={classes.workspaceContentMessages}
        direction="column"
        wrap="nowrap"
      >
        {messageCreator}
      </Grid>
      <Grid className={classes.textareaBlock} item>
        <TextareaAutosize
          aria-label="Send message"
          placeholder="Send message to Me"
          className={classes.textareaSize}
        />
      </Grid>
    </Grid>
  );
};
