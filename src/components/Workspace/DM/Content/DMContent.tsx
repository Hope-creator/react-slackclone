import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IMessage } from "../../../../store/modules/messages/types";
import { Message } from "../../../Message/Message";
import { SendMessageForm } from "../../../SendMessageForm";
import { IUser } from "../../../../store/modules/user/types";
import { CircularProgress } from "@material-ui/core";
import { fetchMessagesDialog } from "../../../../store/modules/messages/messages";
import {
  selectMessagesPage,
  selectMessagesCount,
  selectMessagesTotalCount,
} from "../../../../store/modules/messages/selectors";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

export interface IDMContentProps {
  messages: IMessage[];
  user: IUser;
  partner: IUser;
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

export const DMContent: React.FC<IDMContentProps> = ({
  messages,
  user,
  partner,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const pageMessages = useSelector(selectMessagesPage);
  const countMessages = useSelector(selectMessagesCount);
  const totalCountMessages = useSelector(selectMessagesTotalCount);

  const fetchDataCurrentMembers = () => {
    dispatch(fetchMessagesDialog(partner._id));
  };

  return (
    <Grid
      container
      className={classes.workspaceContentMessages}
      direction="column-reverse"
      wrap="nowrap"
      id="scrollableDiv"
    >
      <Grid className={classes.textareaBlock}>
        <SendMessageForm dm={true} dest={partner._id} />
      </Grid>
      <InfiniteScroll
        dataLength={messages.length}
        inverse={true}
        next={() => fetchDataCurrentMembers()}
        hasMore={pageMessages * countMessages < totalCountMessages}
        loader={<CircularProgress />}
        scrollableTarget="scrollableDiv"
        style={{
          height: "100%",
          overflowY: "hidden",
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
