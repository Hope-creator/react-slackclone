import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IMessage } from "../../../../store/modules/messages/types";
import { Message } from "../../../Message/Message";
import { SendMessageForm } from "../../../SendMessageForm";
import { IUser } from "../../../../store/modules/user/types";
import { IDialog } from "../../../../store/modules/dialogs/types";

export interface IDialogWContentProps {
  messages: IMessage[];
  dialog: IDialog;
  user: IUser;
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
      padding: "0 20px 20px 20px",
    },
    viewChannelBlock: {
      marginTop: "auto",
    },
  })
);

export const DialogWContent: React.FC<IDialogWContentProps> = ({
  messages,
  dialog,
  user,
}) => {
  const classes = useStyles();

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, []);

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
          <Message user={user} key={message._id} message={message} />
        ))}
        <div ref={ref}></div>
      </Grid>
      <Grid
        className={classes.textareaBlock}
        item
      >
          <SendMessageForm dm={true} dest={dialog._id} />
      </Grid>
    </>
  );
};
