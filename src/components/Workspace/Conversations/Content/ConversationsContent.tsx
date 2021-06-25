import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IUser } from "../../../../store/modules/user/types";
import { IConversation } from "../../../../store/modules/conversations/types";
import { ConversationItem } from "../../../ConversationItem";
import { ConversationSearchForm } from "../../../ConversationSearchForm";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentConversationsCount,
  selectCurrentConversationsPage,
  selectCurrentConversationsTotalCount,
} from "../../../../store/modules/currentConversations/selectors";
import { CircularProgress, Typography } from "@material-ui/core";
import {
  clearCurrentConversationsState,
  fetchCurrentConversations,
} from "../../../../store/modules/currentConversations/currentConversations";

export interface IConversationsContentProps {
  conversations: IConversation[];
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    workspaceContent: {
      padding: 20,
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(29,28,29,.52)",
        borderRadius: "4px",
      },
    },
    channelNumText: {
      color: "#616061",
      margin: "10px 0 20px 0",
      "&:hover": {
        color: "#000",
      },
    },
  })
);

export const ConversationsContent: React.FC<IConversationsContentProps> = ({
  conversations,
  user,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrentConversations());
    return function clearUsers() {
      dispatch(clearCurrentConversationsState());
    };
  }, [dispatch]);

  const pageCurrentConversations = useSelector(selectCurrentConversationsPage);
  const countCurrenConversations = useSelector(selectCurrentConversationsCount);
  const totalCountCurrentConversations = useSelector(
    selectCurrentConversationsTotalCount
  );

  const fetchDataCurrentMembers = () => {
    dispatch(fetchCurrentConversations());
  };

  return (
    <>
      <Grid
        container
        item
        className={classes.workspaceContent}
        direction="column"
        wrap="nowrap"
        id="scrollableDiv"
      >
        <ConversationSearchForm />
        <Typography className={classes.channelNumText}>
          {totalCountCurrentConversations > 0
            ? totalCountCurrentConversations + " channels"
            : "No results"}
        </Typography>
        <InfiniteScroll
          dataLength={conversations.length}
          next={() => fetchDataCurrentMembers()}
          hasMore={
            pageCurrentConversations * countCurrenConversations <
            totalCountCurrentConversations
          }
          loader={<CircularProgress />}
          scrollableTarget="scrollableDiv"
          style={{ overflowY: "hidden" }}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {conversations.map((conversation) => (
            <ConversationItem
              user={user}
              key={conversation._id}
              conversation={conversation}
            />
          ))}
        </InfiniteScroll>
      </Grid>
    </>
  );
};
