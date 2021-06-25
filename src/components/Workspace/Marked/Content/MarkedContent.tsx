import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IMessage } from "../../../../store/modules/messages/types";
import { Message } from "../../../Message/Message";
import { IUser } from "../../../../store/modules/user/types";
import Box from "@material-ui/core/Box";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessagesMarked } from "../../../../store/modules/messages/messages";
import {
  selectMessagesPage,
  selectMessagesCount,
  selectMessagesTotalCount,
} from "../../../../store/modules/messages/selectors";

export interface IUnreadsContentProps {
  messages: IMessage[];
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageWrapper: {
      margin: 10,
      border: "1px solid #e6e6e6",
      borderRadius: 10,
    },
    workspaceContentMessages: {
      height: "100%",
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

  const dispatch = useDispatch();

  const pageMessages = useSelector(selectMessagesPage);
  const countMessages = useSelector(selectMessagesCount);
  const totalCountMessages = useSelector(selectMessagesTotalCount);

  const fetchDataCurrentMembers = () => {
    dispatch(fetchMessagesMarked());
  };

  return (
    <div className={classes.workspaceContentMessages} id="scrollableDiv">
      <InfiniteScroll
        dataLength={messages.length}
        next={() => fetchDataCurrentMembers()}
        hasMore={pageMessages * countMessages < totalCountMessages}
        loader={<CircularProgress />}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {messages.map((message) => (
          <Box className={classes.messageWrapper}>
            <Message user={user} key={message._id} message={message} />
          </Box>
        ))}
      </InfiniteScroll>
    </div>
  );
};
