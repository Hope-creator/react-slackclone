import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { MembersSearchForm } from "./MembersSearchForm";
import { IUser } from "../store/modules/user/types";
import { UserListItem } from "./UserListItem";
import { useSelector } from "react-redux";
import { selectUser } from "../store/modules/user/selectors";

interface IMembersModalProps {
  name: string;
  users: IUser[];
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
  users,
  opener,
  name,
}) => {
  const classes = useStyles();

  const me = useSelector(selectUser);

  const [open, setOpen] = React.useState(false);

  const [filterName, setFilterName] = React.useState<string>("");

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
      <Grid alignItems="center" container justify="space-between" wrap="nowrap">
        <Typography className={classes.headerText} variant="h6">
          {users.length} members in #{name}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <MembersSearchForm formSubmit={changeFilterName} />
      {(
        (filterName && users.filter((user) => user.name === filterName)) ||
        users
      ).map((user) => (
        <UserListItem key={user._id} user={user} isMe={(me as IUser)._id === user._id} />
      ))}
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
