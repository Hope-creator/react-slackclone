import { Avatar, ListItem, ListItemAvatar } from "@material-ui/core";
import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import defaultAvatar from "../images/defaultAvatar.png";
import { IUser } from "../store/modules/user/types";
import { useHistory } from "react-router-dom";
import { useUnreadCount } from "../hooks/useUnreadCount";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { IDialog } from "../store/modules/dialogs/types";

interface IDirectMessageListItemProps {
  dialog: IDialog;
  user: IUser;
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
      color: theme.palette.secondary.main
    }
  })
);

export const DirectMessageListItem: React.FC<IDirectMessageListItemProps> = ({
  dialog,
  user,
}) => {
  const classes = useStyles();
  const unread = useUnreadCount(dialog._id);

  const partner =
    dialog.creator._id !== user._id ? dialog.creator : dialog.partner;

  const history = useHistory();

  const isActive = history.location.pathname.match(dialog._id) ? true : false;

  return (
    <ListItem
      className={isActive ? classes.activeBg : undefined}
      dense
      button
      onClick={() => history.push(`/d/${dialog._id}`)}
    >
      <ListItemAvatar>
        <Avatar
          className={classes.avatar}
          alt={`user_avatar_+${partner.name}`}
          src={partner.avatar || defaultAvatar}
          sizes="width: 10px; height: 10px"
        />
      </ListItemAvatar>
      <ListItemText
        className={isActive ? classes.activeText : classes.defaultText}
      >
        {partner.name}
      </ListItemText>
     {partner._id === user._id ? <ListItemText primaryTypographyProps={{variant: "caption", className: classes.selfText}}>
        you
      </ListItemText> :  <ListItemText
        primaryTypographyProps={{ color: "primary", className: classes.count }}
      >
        {unread > 0 && unread}
      </ListItemText>}
    </ListItem>
  );
};
