import React from "react";
import { IConversation } from "../store/modules/conversations/types";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  ListItemIcon,
} from "@material-ui/core";
import { IUser } from "../store/modules/user/types";
import DoneIcon from "@material-ui/icons/Done";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoinOneConversation } from "../store/modules/conversationsAccess/conversationsAccess";
import {
  selectIsConversationsAccessError,
  selectIsConversationsAccessFetching,
} from "../store/modules/conversationsAccess/selectors";
import { useHistory } from "react-router-dom";
import { LeaveConversationModal } from "./LeaveConversationModal";

interface IConversationItemProps {
  conversation: IConversation;
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 20,
      borderTop: "1px solid #DDDDDD",
      borderCollapse: "collapse",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#e6e6e6",
      },
      "&:last-child": {
        borderBottom: "1px solid #DDDDDD",
      },
    },
    joinedText: {
      color: "green",
    },
    errorButton: {
      color: "red",
    },
    lockIcon: {
      fontSize: 14,
      minWidth: 0,
    },
  })
);

export const ConversationItem: React.FC<IConversationItemProps> = ({
  conversation,
  user,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const isConversationAccessFetching = useSelector(
    selectIsConversationsAccessFetching(conversation._id)
  );

  const isConversationAccessError = useSelector(
    selectIsConversationsAccessError(conversation._id)
  );

  const isMember = user.conversations.includes(conversation._id);

  const setIsHoveredTrue = () => {
    setIsHovered(true);
  };

  const setIsHoveredFalse = () => {
    setIsHovered(false);
  };

  const handleJoinButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(fetchJoinOneConversation(conversation._id));
  };

  const handleClickContainer = () => {
    history.push(conversation._id);
  };

  return (
    <Grid
      onMouseEnter={setIsHoveredTrue}
      onMouseLeave={setIsHoveredFalse}
      className={classes.container}
      container
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
      onClick={handleClickContainer}
    >
      <Grid item>
        <Typography variant="subtitle2">
          <>
            {conversation.is_private ? (
              <ListItemIcon className={classes.lockIcon}>
                <LockIcon className={classes.lockIcon} color="inherit" />
              </ListItemIcon>
            ) : (
              "#"
            )}
          </>
          {conversation.name}
        </Typography>
        <Grid container wrap="nowrap" alignItems="center">
          {isMember && (
            <>
              <Typography variant="caption" className={classes.joinedText}>
                <DoneIcon fontSize="small" /> Joined
              </Typography>
              &nbsp;&nbsp;·&nbsp;&nbsp;
            </>
          )}
          <Typography variant="caption">
            {conversation.num_members} members
          </Typography>
        </Grid>
      </Grid>
      {isHovered && (
        <>
          {isConversationAccessFetching ? (
            <CircularProgress />
          ) : (
            <Grid item>
              {isMember ? (
                <LeaveConversationModal
                  conversation={conversation}
                  opener={
                    <Button color="inherit" variant="outlined">
                      Leave
                    </Button>
                  }
                />
              ) : (
                <Button
                  onClick={handleJoinButton}
                  color="primary"
                  variant="contained"
                  className={
                    isConversationAccessError ? classes.errorButton : undefined
                  }
                >
                  Join
                </Button>
              )}
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
