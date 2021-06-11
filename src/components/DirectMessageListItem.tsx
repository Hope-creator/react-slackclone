import { Avatar, ListItem, ListItemAvatar } from "@material-ui/core";
import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import defaultAvatar from "../images/defaultAvatar.png";
import { IUser } from "../store/modules/user/types";
import { IConversation } from "../store/modules/conversations/types";
import { useSelector } from "react-redux";
import { selectUser } from "../store/modules/user/selectors";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useUnreadCount } from "../hooks/useUnreadCount";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useUserProfile } from "../hooks/useUserProfile";
import conversations from "../store/modules/conversations/conversations";
import { conversationsApi } from "../services/api/converastionsApi";
import { IDialog } from "../store/modules/dialogs/types";

interface DirectMessageListItemProps {
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
  })
);

export const DirectMessageListItem: React.FC<DirectMessageListItemProps> = ({
  dialog,
  user
}: DirectMessageListItemProps): React.ReactElement => {
  const classes = useStyles();
  const unread = useUnreadCount(dialog._id);

  const partner = useUserProfile(
    dialog.members.filter((id) => id !== user._id)[0]
  );

  

  const history = useHistory();

  const isActive = history.location.pathname.match(dialog._id)
    ? true
    : false;

  if (!partner) return <CircularProgress />;

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
      <ListItemText
        primaryTypographyProps={{ color: "primary", className: classes.count }}
      >
        {unread > 0 && unread}
      </ListItemText>
    </ListItem>
  );
};
