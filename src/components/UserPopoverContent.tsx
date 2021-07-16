import React from "react";
import { IUser } from "../store/modules/user/types";
import { Avatar, Link, Paper, Typography } from "@material-ui/core";
import defaultAvatar from "../images/defaultAvatar.png";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { fetchInfoSideProfile } from "../store/modules/infoSide/infoSide";
import { useHistory } from "react-router-dom";

interface IUserPopoverContentProps {
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoWrapper: {
      textAlign: "center",
      padding: 10,
    },
    button: {
      marginTop: theme.spacing(2),
      border: "1px solid #c9c9c9",
    },
    name: {
      width: "250px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);

export const UserPopoverContent: React.FC<IUserPopoverContentProps> = ({
  user,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const userInfoHandleClick = () => {
    dispatch(fetchInfoSideProfile(user._id));
  };

  const dialogHandleClick = () => {
    history.push(`/d/${user._id}`);
  };

  return (
    <Paper>
      <Avatar
        src={user.avatar || defaultAvatar}
        style={{ width: 300, height: 300 }}
      />
      <Grid
        className={classes.infoWrapper}
        container
        direction="column"
        wrap="nowrap"
      >
        <Link onClick={userInfoHandleClick} color="inherit">
          <Typography className={classes.name} variant="h5">
            {user.name}
          </Typography>
        </Link>
        {user.work && <Typography variant="h5">{user.work}</Typography>}
        <Link onClick={userInfoHandleClick} color="secondary">
          View full profile
        </Link>
        <Button onClick={dialogHandleClick} className={classes.button}>
          Message
        </Button>
      </Grid>
    </Paper>
  );
};
