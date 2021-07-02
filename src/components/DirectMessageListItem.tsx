import { ListItem, ListItemAvatar } from "@material-ui/core";
import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import { IUser } from "../store/modules/user/types";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AvatarWithBadge } from "./AvatarWithBadge";

interface IDirectMessageListItemProps {
  user: IUser;
  me: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    count: {
      display: "block",
      width: 20,
      borderRadius: 10,
      marginLeft: "auto",
      textAlign: "center",
      backgroundColor: "pink",
    },
    container: {
      height: 35,
    },
    avatar: {
      width: 20,
      height: 20,
    },
    activeBg: {
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    activeText: {
      color: "#fff",
    },
    defaultText: {
      color: theme.palette.primary.main,
    },
    selfText: {
      display: "block",
      marginLeft: "auto",
      textAlign: "center",
      width: 20,
      color: theme.palette.secondary.main,
    },
  })
);

export const DirectMessageListItem: React.FC<IDirectMessageListItemProps> = ({
  user,
  me,
}) => {
  const classes = useStyles();

  const history = useHistory();

  const isActive = history.location.pathname.match(user._id) ? true : false;

  return (
    <ListItem
      className={isActive ? classes.activeBg : classes.container}
      dense
      button
      onClick={() => history.push(`/d/${user._id}`)}
    >
      <ListItemAvatar>
        <AvatarWithBadge
          user={user}
          className={classes.avatar}
          sizes="width: 10px; height: 10px"
        />
      </ListItemAvatar>
      <ListItemText
        className={isActive ? classes.activeText : classes.defaultText}
      >
        {user.name}
      </ListItemText>
      {me._id === user._id && (
        <ListItemText
          primaryTypographyProps={{
            variant: "caption",
            className: classes.selfText,
          }}
        >
          you
        </ListItemText>
      )}
    </ListItem>
  );
};
