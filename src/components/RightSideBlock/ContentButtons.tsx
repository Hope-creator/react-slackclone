import React from "react";

import { CircularProgress, Grid, IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { AddPeopleModal } from "../AddPeopleModal";
import { IConversation } from "../../store/modules/conversations/types";
import { ConvNameEditModal } from "../ConvNameEditModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsConversationsAccessError,
  selectIsConversationsAccessFetching,
} from "../../store/modules/conversationsAccess/selectors";
import { IUser } from "../../store/modules/user/types";
import { LeaveConversationModal } from "../LeaveConversationModal";
import { fetchJoinOneConversation } from "../../store/modules/conversationsAccess/conversationsAccess";

interface IContentButtonsProps {
  channel: IConversation;
  me: IUser;
}

const useStyles = makeStyles(() =>
  createStyles({
    buttonsWrapper: {
      padding: "18px 0",
      borderBottom: "1px solid rgb(233,227,230)",
    },
    leaveButton: {
      color: "#e01e5a",
      "&:hover": {
        backgroundColor: "#ff6a9824",
      },
    },
    errorButton: {
      color: "red",
    },
  })
);

export const ContentButtons: React.FC<IContentButtonsProps> = ({
  channel,
  me,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const isAccessFetching = useSelector(
    selectIsConversationsAccessFetching(channel._id)
  );
  const isAccessError = useSelector(
    selectIsConversationsAccessError(channel._id)
  );

  const handleJoinClick = () => {
    dispatch(fetchJoinOneConversation(channel._id));
  };

  const isMember = me.conversations.includes(channel._id);

  return (
    <Grid
      container
      className={classes.buttonsWrapper}
      wrap="wrap"
      justify="space-around"
      alignItems="center"
    >
      <AddPeopleModal
        conversation={channel}
        opener={
          <IconButton>
            <PersonAddOutlinedIcon />
            Add
          </IconButton>
        }
      />
      <ConvNameEditModal
        conversation={channel}
        opener={
          <IconButton>
            <CreateOutlinedIcon />
            Rename
          </IconButton>
        }
      />
      {isAccessFetching ? (
        <CircularProgress size={14} />
      ) : isMember ? (
        <LeaveConversationModal
          conversation={channel}
          opener={
            <IconButton
              className={
                isAccessError ? classes.errorButton : classes.leaveButton
              }
            >
              <ExitToAppOutlinedIcon />
              Leave
            </IconButton>
          }
        />
      ) : (
        <IconButton
          className={isAccessError ? classes.errorButton : undefined}
          onClick={handleJoinClick}
          color="primary"
        >
          <ExitToAppOutlinedIcon />
          Join
        </IconButton>
      )}
    </Grid>
  );
};
