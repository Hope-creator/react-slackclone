import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { AddPeopleModalForm } from "./AddPeopleModalForm";
import { IConversation } from "../store/modules/conversations/types";

interface IAddPeopleModalProps {
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
    conversationName: {
      width: "600px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: "rgba(29,28,29,.7)",
    },
    headerText: {
      textAlign: "start",
    },
  })
);

export const AddPeopleModal: React.FC<IAddPeopleModalProps> = ({
  opener,
  conversation,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const children = () => (
    <Paper className={classes.paper}>
      <Grid alignItems="center" container justify="space-between" wrap="nowrap">
        <Grid container wrap="nowrap" direction="column">
          <Typography className={classes.headerText} variant="h6">
            Add people
          </Typography>
          <Typography className={classes.conversationName} variant="caption">
            #{conversation.name}
          </Typography>
        </Grid>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <AddPeopleModalForm conversationId={conversation._id} />
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
