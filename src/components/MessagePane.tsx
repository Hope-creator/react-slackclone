import React from "react";

import { Avatar, Grid, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ClearIcon from "@material-ui/icons/Clear";

interface MessagePaneProps {
  avatarSrc?: string;
  icon?: React.ReactNode;
  header: string;
  children: React.ReactNode;
  marked: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      margin: "0 auto"
    },
    icon: {
      marginRight: 8,
      padding: 10,
      backgroundColor: "rgb(244, 237, 228)",
      margin: "0 auto"
    },
    maxWidthContent: {
      width: "inherit",
      maxWidth: "88%",
    },
    maxWidthText: {
      width: "100%",
    },
    message: {
      wordWrap: "break-word",
    },
    messageContainer: {
      "&:hover": {
        backgroundColor: "rgba(221,221,221, 01)",
      },
    },
  })
);

export const MessagePane: React.FC<MessagePaneProps> = ({
  avatarSrc,
  icon,
  header,
  children,
  marked,
}: MessagePaneProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid container wrap="nowrap" className={classes.messageContainer}>
      <Grid
        item
        xs={1}
        sm={2}
        lg={1}
        className={icon ? classes.icon : classes.avatar}
      >
        {avatarSrc ? (
          <Avatar alt={`profile__picture__${avatarSrc}`} src={avatarSrc} />
        ) : icon ? (
          icon
        ) : null}
      </Grid>
      <Grid
        item
        container
        wrap="nowrap"
        alignItems="center"
        justify="space-between"
        className={classes.maxWidthContent}
      >
        <Grid item lg={10}>
          <Grid container direction="column">
            <Grid item className={classes.maxWidthText}>
              <Typography variant="subtitle2">{header}</Typography>
            </Grid>
            <Grid item className={classes.maxWidthText}>
              <Typography className={classes.message}>{children}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container wrap="nowrap" justify="center" lg={2}>
          {marked ? (
            <IconButton size="small" onClick={() => console.log("Bookmark")}>
              <BookmarkIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={() => console.log("Bookmark")}>
              <BookmarkBorderIcon color="primary" />
            </IconButton>
          )}
          <IconButton size="small" onClick={() => console.log("Clear")}>
            <ClearIcon color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessagePane;
