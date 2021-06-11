import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { LoadingMessagesState } from "../../../../store/modules/messages/types";
import { Message } from "../../../Message/Message";
import { SendMessageForm } from "../../../SendMessageForm";
import { IUser } from "../../../../store/modules/user/types";
import { IConversation } from "../../../../store/modules/conversations/types";
import { ViewConversationBlock } from "../../../ViewConversationBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessages,
  selectMessagesLoadingState,
} from "../../../../store/modules/messages/selectors";
import { fetchMessagesConversation } from "../../../../store/modules/messages/messages";
import { CircularProgress } from "@material-ui/core";

export interface IConversationContentProps {
  conversation: IConversation;
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

export const ConversationContent: React.FC<IConversationContentProps> = ({
  conversation,
  user,
}: IConversationContentProps) => {
  const classes = useStyles();

  const messages = useSelector(selectMessages);
  const messagesLoadingState = useSelector(selectMessagesLoadingState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchMessagesConversation(conversation._id));
  }, [conversation._id, dispatch]);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [ref]);

  const isMember = user.conversations.includes(conversation._id);

  if (messagesLoadingState === LoadingMessagesState.LOADING)
    return <CircularProgress />;
  if (messagesLoadingState === LoadingMessagesState.LOADED) {
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
          className={
            isMember ? classes.textareaBlock : classes.viewChannelBlock
          }
          item
        >
          {isMember ? (
            <SendMessageForm dest={conversation._id} />
          ) : (
            <ViewConversationBlock conversation={conversation} />
          )}
        </Grid>
      </>
    );
  }
  return null;
};
