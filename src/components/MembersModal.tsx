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
import { MembersSearchForm } from "./MembersSearchForm";
import { UserListItem } from "./UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/modules/user/selectors";
import {
  selectConversationMembers,
  selectConversationsMembersLoadingState,
} from "../store/modules/conversationMembers/selectors";
import { LoadingConversationsMembersState } from "../store/modules/conversationMembers/types";
import { IConversation } from "../store/modules/conversations/types";
import {
  clearConversationMembers,
  fetchConverastionMembers,
} from "../store/modules/conversationMembers/conversationMembers";

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

  const members = useSelector(selectConversationMembers);

  const membersLoadingState = useSelector(
    selectConversationsMembersLoadingState
  );

  React.useEffect(() => {
    dispatch(fetchConverastionMembers(conversation._id));
    return function cleanup() {
      dispatch(clearConversationMembers());
    };
  }, [conversation._id, dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeFilterName = (name: string) => {
    setFilterName(name);
  };

  const children = () => (
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
          <MembersSearchForm formSubmit={changeFilterName} />
          {me &&
            (
              (filterName &&
                members.filter((user) => user.name === filterName)) ||
              members
            ).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                isMe={me._id === user._id}
              />
            ))}
        </>
      )}
    </Paper>
  );

  return (
    <div>
      <div onClick={handleOpen}>{opener}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {children()}
      </Modal>
    </div>
  );
};
