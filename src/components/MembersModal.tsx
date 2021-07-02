import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { UsersSearchForm } from "./UsersSearchForm";
import { UserListItem } from "./UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/modules/user/selectors";
import {
  selectConversationsMembersLoadingState,
  selectFilteredConversationMembers,
} from "../store/modules/conversationMembers/selectors";
import { LoadingConversationsMembersState } from "../store/modules/conversationMembers/types";
import { IConversation } from "../store/modules/conversations/types";
import {
  addOneConversationMembers,
  clearConversationMembers,
  deleteOneConversationMembers,
  fetchConversationMembers,
} from "../store/modules/conversationMembers/conversationMembers";
import { IUser } from "../store/modules/user/types";
import socket from "../services/socket/socket";
import { FixedSizeList as List } from "react-window";

interface IMembersModalProps {
  conversation: IConversation;
  opener: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      top: "50%",
      left: "50%",
      position: "absolute",
      height: "auto",
      outline: "none",
      width: 700,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      transform: `translate(-50%, -50%)`,
      [theme.breakpoints.down("sm")]: {
        width: 350,
      },
      [theme.breakpoints.down("xs")]: {
        width: 250,
      },
    },
    headerText: {
      width: "600px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);

export const MembersModal: React.FC<IMembersModalProps> = ({
  opener,
  conversation,
}) => {
  const classes = useStyles();

  const me = useSelector(selectUser);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [filterName, setFilterName] = React.useState<string>("");

  const members = useSelector(selectFilteredConversationMembers(filterName));

  const membersLoadingState = useSelector(
    selectConversationsMembersLoadingState
  );

  React.useEffect(() => {
    dispatch(fetchConversationMembers(conversation._id));
    return function cleanup() {
      dispatch(clearConversationMembers());
    };
  }, [conversation._id, dispatch]);

  const handleListenerNewUsers = React.useCallback(
    (conversationId: string) => {
      if (conversationId === conversation._id)
        dispatch(fetchConversationMembers(conversation._id));
    },
    [dispatch, conversation._id]
  );

  const handleListenerNewUser = React.useCallback(
    (user: IUser, conversationId: string) => {
      if (conversationId === conversation._id)
        dispatch(addOneConversationMembers(user));
    },
    [dispatch, conversation._id]
  );

  const handleListenerKickUser = React.useCallback(
    (user: IUser, conversationId: string) => {
      if (conversationId === conversation._id)
        dispatch(deleteOneConversationMembers(user));
    },
    [dispatch, conversation._id]
  );

  React.useEffect(() => {
    socket.addEventListener(
      "SERVER:NEW_CONVERSATION_MEMBER",
      handleListenerNewUser
    );
    socket.addEventListener(
      "SERVER:NEW_CONVERSATION_MEMBER_MANY",
      handleListenerNewUsers
    );
    socket.addEventListener("SERVER:MEMBER_KICKED", handleListenerKickUser);
    return () => {
      socket.removeListener(
        "SERVER:NEW_CONVERSATION_MEMBER",
        handleListenerNewUser
      );
      socket.removeListener(
        "SERVER:NEW_CONVERSATION_MEMBER_MANY",
        handleListenerNewUsers
      );
      socket.removeListener("SERVER:MEMBER_KICKED", handleListenerKickUser);
    };
  }, [
    dispatch,
    handleListenerNewUsers,
    handleListenerNewUser,
    handleListenerKickUser,
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeFilterName = (name: string) => {
    setFilterName(name);
  };

  const itemKey = (index: number, data: IUser[]) => {
    const user = data[index];
    return user._id;
  };

  return (
    <div>
      <div onClick={handleOpen}>{opener}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper}>
          {membersLoadingState === LoadingConversationsMembersState.LOADING ? (
            <CircularProgress />
          ) : (
            <>
              <Grid
                alignItems="center"
                container
                justify="space-between"
                wrap="nowrap"
              >
                <Typography className={classes.headerText} variant="h6">
                  {members.length} members in #{conversation.name}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <UsersSearchForm formSubmit={changeFilterName} />
              {me && (
                <List
                  height={240}
                  itemCount={members.length}
                  itemSize={60}
                  itemData={members}
                  itemKey={itemKey}
                  width="inherit"
                >
                  {({ index, style }) => {
                    const user = members[index];
                    return (
                      <div style={style}>
                        <UserListItem
                          conversation={conversation}
                          user={user}
                          isMe={me._id === user._id}
                        />
                      </div>
                    );
                  }}
                </List>
              )}
            </>
          )}
        </Paper>
      </Modal>
    </div>
  );
};
