import { ListItem, ListItemIcon } from "@material-ui/core";
import React, { useCallback } from "react";
import LockIcon from "@material-ui/icons/Lock";
import ListItemText from "@material-ui/core/ListItemText";
import { IConversation } from "../store/modules/conversations/types";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface ChannelProps {
  channel: IConversation;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activeContainer: {
      height: 35,
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    activeIcon: {
      color: "#fff",
    },
    container: {
      height: 35,
    },
    name: {
      width: "auto",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: theme.palette.primary.main
    },
  })
);

export const Channel: React.FC<ChannelProps> = ({ channel }) => {
  const classes = useStyles();
  const history = useHistory();
  const isActive = history.location.pathname.match(channel._id);
  const pushChannel = useCallback(
    (id) => {
      history.push(`/${id}`);
    },
    [history]
  );
  return (
    <ListItem
      className={isActive ? classes.activeContainer : classes.container}
      dense
      button
      onClick={() => pushChannel(channel._id)}
    >
      {channel.is_private ? (
        <ListItemIcon>
          <LockIcon
            className={isActive ? classes.activeIcon : undefined}
            color="primary"
          />
        </ListItemIcon>
      ) : (
        <ListItemIcon>
          <Typography
            className={isActive ? classes.activeIcon : undefined}
            color="primary"
            variant="h6"
          >
            &nbsp;&nbsp;#
          </Typography>
        </ListItemIcon>
      )}
      <ListItemText
        primaryTypographyProps={{
          className: classes.name,
          style: {
            color: isActive ? "#fff" : undefined,
          },
        }}
      >
        {channel.name}
      </ListItemText>
    </ListItem>
  );
};
