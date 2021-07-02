import React from "react";
import { IConversation } from "../store/modules/conversations/types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, Grid, Modal, Paper, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { fetchLeaveOneConversation } from "../store/modules/conversationsAccess/conversationsAccess";
import { useDispatch, useSelector } from "react-redux";
import { selectInfoSideItem } from "../store/modules/infoSide/selectors";
import { clearInfoSideConversation } from "../store/modules/infoSide/infoSide";
import { clearCurrentConversation } from "../store/modules/currentConversation/currentConversation";

interface ILeaveConversationModalProps {
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
      width: 300,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      transform: `translate(-50%, -50%)`,
    },
    conversationName: {
      width: "150px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: "#000",
      marginBottom: 10,
    },
    leaveButton: {
      marginLeft: 10,
    },
    buttonsWrapper: {
      marginTop: 20,
    },
    lockIcon: {
      fontSize: 16,
    },
  })
);

export const LeaveConversationModal: React.FC<ILeaveConversationModalProps> = ({
  conversation,
  opener,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const infoSideItem = useSelector(selectInfoSideItem);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLeaveClick = () => {
    dispatch(fetchLeaveOneConversation(conversation._id));
    if (conversation.is_private && infoSideItem?._id === conversation._id) {
      dispatch(clearInfoSideConversation(conversation._id));
      dispatch(clearCurrentConversation(conversation._id));
    }
  };

  const children = () => (
    <Paper className={classes.paper}>
      <Typography className={classes.conversationName} variant="h6">
        Leave{" "}
        {conversation.is_private ? (
          <LockIcon className={classes.lockIcon} />
        ) : (
          "#"
        )}{" "}
        {conversation.name}
      </Typography>
      <Typography variant="body2">
        Channel members won’t be notified that you’ve left.
        {conversation.is_private ? (
          <b> You can't rejoin in private channel by yourself</b>
        ) : (
          " You can rejoin anytime."
        )}
      </Typography>
      <Grid className={classes.buttonsWrapper} container justify="flex-end">
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleLeaveClick}
          className={classes.leaveButton}
          color="secondary"
          variant="contained"
        >
          Leave channel
        </Button>
      </Grid>
    </Paper>
  );

  return (
    <div onClick={(event) => event.stopPropagation()}>
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
