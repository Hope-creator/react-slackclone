import React from "react";

import { Avatar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { MessageButtons } from "./MessageButtons";
import { MessageHeader } from "./MessageHeader";
import Typography from "@material-ui/core/Typography";
import BookmarkIcon from "@material-ui/icons/Bookmark";

interface MessagePaneProps {
  avatarSrc: string;
  header: string;
  time: string;
  marked: boolean;
  children: React.ReactNode;
  isMessageOwner: boolean;
  messageId: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      margin: "0 auto",
    },
    maxWidthContent: {
      width: "inherit",
      maxWidth: "88%",
    },
    maxWidthText: {
      width: "100%",
    },
    messageContainer: {
      padding: "8px 20px",

      "&:hover": {
        backgroundColor: "rgba(28,28,28,.03)",
      },
    },
    markedMessageContainer: {
      backgroundColor: "#FEF9EC",
      padding: "8px 20px",
    },
    timeText: {
      color: "rgba(97,97,97,1)",
      marginLeft: 5,
      cursor: "pointer",
    },
    tooltip: {
      backgroundColor: "black",
    },
    bookmarkIcon: {
      color: "#e01e5a",
      fontSize: 16,
      display: "block",
      marginLeft: "auto",
    },
    markedText: {
      fontSize: 12,
      color: "rgba(28,28,28,.7)",
    },
  })
);

export const MessagePane: React.FC<MessagePaneProps> = ({
  avatarSrc,
  header,
  children,
  marked,
  time,
  isMessageOwner,
  messageId,
}: MessagePaneProps): React.ReactElement => {
  const classes = useStyles();

  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const setIsHoveredTrue = () => {
    setIsHovered(true);
  };

  const setIsHoveredFalse = () => {
    setIsHovered(false);
  };

  return (
    <Grid
      onMouseEnter={setIsHoveredTrue}
      onMouseLeave={setIsHoveredFalse}
      container
      wrap="nowrap"
      className={
        marked ? classes.markedMessageContainer : classes.messageContainer
      }
    >
      <Grid item xs={1} sm={2} lg={1} className={classes.avatar}>
        {marked && <BookmarkIcon className={classes.bookmarkIcon} />}
        <Avatar alt={`profile__picture__${avatarSrc}`} src={avatarSrc} />
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
            {marked && (
              <Typography className={classes.markedText}>
                Added to your saved items
              </Typography>
            )}
            <MessageHeader text={header} time={time} />
            <Grid item className={classes.maxWidthText}>
              {children}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container wrap="nowrap" justify="center" lg={2}>
          {isHovered && (
            <MessageButtons
              messageId={messageId}
              marked={marked}
              isMessageOwner={isMessageOwner}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessagePane;
