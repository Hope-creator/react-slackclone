import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/modules/user/selectors";
import { IUser } from "../store/modules/user/types";
import { fetchJoinAllConversations } from "../store/modules/joinConversations/joinConversations";
import { selectConversations } from "../store/modules/conversations/selectors";
import { selectJoinConversationsLoadingState } from "../store/modules/joinConversations/selectors";
import { LoadingJoinConversationsState } from "../store/modules/joinConversations/types";
import { CircularProgress } from "@material-ui/core";

interface IJoinAllModalProps {
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
    buttonError: {
      backgroundColor: "pink",
    },
  })
);

export const JoinAllModal: React.FC<IJoinAllModalProps> = ({ opener }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const me = useSelector(selectUser);

  const conversations = useSelector(selectConversations);

  const joinAllLoadingState = useSelector(selectJoinConversationsLoadingState);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const joinHandleClick = () => {
    dispatch(fetchJoinAllConversations(conversations.map((conv) => conv._id)));
    setOpen(false);
  };

  const children = () => (
    <Paper className={classes.paper}>
      {joinAllLoadingState === LoadingJoinConversationsState.LOADING ? (
        <CircularProgress />
      ) : (
        <Typography variant="h6" gutterBottom>
          Join to all non private conversations of {(me as IUser).company.name}?
        </Typography>
      )}
      <Grid alignItems="center" container justify="space-between" wrap="nowrap">
        <Button
          className={
            joinAllLoadingState === LoadingJoinConversationsState.ERROR
              ? classes.buttonError
              : undefined
          }
          onClick={joinHandleClick}
          color="primary"
          variant="outlined"
        >
          Join
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
      </Grid>
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
