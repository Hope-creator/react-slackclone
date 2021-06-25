import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message } from "../../../Message/Message";
import { SendMessageForm } from "../../../SendMessageForm";
import { IUser } from "../../../../store/modules/user/types";
import { IConversation } from "../../../../store/modules/conversations/types";
import { ViewConversationBlock } from "../../../ViewConversationBlock";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  selectMessages,
  selectMessagesPage,
  selectMessagesCount,
  selectMessagesTotalCount,
} from "../../../../store/modules/messages/selectors";
import {
  clearMessagesState,
  fetchMessagesConversation,
} from "../../../../store/modules/messages/messages";
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
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchMessagesConversation(conversation._id));
    return function cleanup() {
      dispatch(clearMessagesState());
    };
  }, [conversation._id, dispatch]);

  const pageMessages = useSelector(selectMessagesPage);
  const countMessages = useSelector(selectMessagesCount);
  const totalCountMessages = useSelector(selectMessagesTotalCount);

  const fetchDataMessagesConversation = () => {
    dispatch(fetchMessagesConversation(conversation._id));
  };

  const isMember = user.conversations.includes(conversation._id);

  return (
    <Grid
      container
      className={classes.workspaceContentMessages}
      direction="column-reverse"
      wrap="nowrap"
      id="scrollableDiv"
    >
      <Grid
        className={isMember ? classes.textareaBlock : classes.viewChannelBlock}
        item
      >
        {isMember ? (
          <SendMessageForm dest={conversation._id} />
        ) : (
          <ViewConversationBlock conversation={conversation} />
        )}
      </Grid>
      <InfiniteScroll
        dataLength={messages.length}
        inverse={true}
        next={() => fetchDataMessagesConversation()}
        hasMore={pageMessages * countMessages < totalCountMessages}
        loader={<CircularProgress />}
        scrollableTarget="scrollableDiv"
        style={{
          height: "100%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }} //To put endMessage and loader to the top.
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {messages.map((message) => (
          <Message user={user} key={message._id} message={message} />
        ))}
      </InfiniteScroll>
    </Grid>
  );
};
