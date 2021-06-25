import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IMessage } from "../../../../store/modules/messages/types";
import { Message } from "../../../Message/Message";
import { IUser } from "../../../../store/modules/user/types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessagesPage,
  selectMessagesCount,
  selectMessagesTotalCount,
} from "../../../../store/modules/messages/selectors";
import { CircularProgress } from "@material-ui/core";
import { fetchMessagesUnread } from "../../../../store/modules/messages/messages";

export interface IUnreadsContentProps {
  messages: IMessage[];
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export const UnreadsContent: React.FC<IUnreadsContentProps> = ({
  messages,
  user,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const pageMessages = useSelector(selectMessagesPage);
  const countMessages = useSelector(selectMessagesCount);
  const totalCountMessages = useSelector(selectMessagesTotalCount);

  const fetchDataUnreadMessages = () => {
    dispatch(fetchMessagesUnread());
  };

  return (
    <div className={classes.workspaceContentMessages}>
      <InfiniteScroll
        dataLength={messages.length}
        next={() => fetchDataUnreadMessages()}
        hasMore={pageMessages * countMessages < totalCountMessages}
        loader={<CircularProgress />}
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
    </div>
  );
};
