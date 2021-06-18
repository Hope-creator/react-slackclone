import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IUser } from "../../../../store/modules/user/types";
import { IConversation } from "../../../../store/modules/conversations/types";
import { ConversationItem } from "../../../ConversationItem";
import { ConversationSearchForm } from "../../../ConversationSearchForm";
import { useSelector } from "react-redux";
import { selectCurrentConversationsLoadingState } from "../../../../store/modules/currentConversations/selectors";
import { LoadingCurrentConversationsState } from "../../../../store/modules/currentConversations/types";
import { CircularProgress, Typography } from "@material-ui/core";

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
        color: "#000"
      }
    }
  })
);

export const ConversationsContent: React.FC<IConversationsContentProps> = ({
  conversations,
  user,
}) => {
  const classes = useStyles();

  const conversationsWithFilterLoadingState = useSelector(
    selectCurrentConversationsLoadingState
  );

  return (
    <>
      <Grid
        container
        item
        className={classes.workspaceContent}
        direction="column"
        wrap="nowrap"
      >
        <ConversationSearchForm />
        <Typography className={classes.channelNumText}>
          {conversations.length > 0 ? conversations.length + " channels" : "No results"}
        </Typography>
        {conversationsWithFilterLoadingState ===
        LoadingCurrentConversationsState.LOADING ? (
          <CircularProgress />
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              user={user}
              key={conversation._id}
              conversation={conversation}
            />
          ))
        )}
      </Grid>
    </>
  );
};
