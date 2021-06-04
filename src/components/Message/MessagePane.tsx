import React from "react";

import { Avatar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { MessageButtons } from "./MessageButtons";
import { MessageHeader } from "./MessageHeader";
import Typography from "@material-ui/core/Typography";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { IMessage } from "../../store/modules/messages/types";
import { IUser } from "../../store/modules/user/types";
import defaultAvatar from "../../images/defaultAvatar.png";

interface MessagePaneProps {
  message: IMessage;
  user: IUser;
  children: React.ReactNode;
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
    unread: {
      backgroundColor: "#e0e0ff75",
    },
  })
);

export const MessagePane: React.FC<MessagePaneProps> = ({
  message,
  children,
  user,
}: MessagePaneProps): React.ReactElement => {
  const classes = useStyles();

  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const setIsHoveredTrue = () => {
    setIsHovered(true);
  };

  const setIsHoveredFalse = () => {
    setIsHovered(false);
  };

  const isUnread = message.unreadBy.includes(user._id);

  return (
    <Grid
      onMouseEnter={setIsHoveredTrue}
      onMouseLeave={setIsHoveredFalse}
      container
      wrap="nowrap"
      className={
        (message.marked
          ? classes.markedMessageContainer
          : classes.messageContainer) +
        " " +
        (isUnread && classes.unread)
      }
    >
      <Grid item xs={1} sm={2} lg={1} className={classes.avatar}>
        {message.marked && <BookmarkIcon className={classes.bookmarkIcon} />}
        <Avatar
          alt={`profile__picture__${message.creator.avatar}`}
          src={message.creator.avatar || defaultAvatar}
        />
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
            {message.marked && (
              <Typography className={classes.markedText}>
                Added to your saved items
              </Typography>
            )}
            <MessageHeader
              text={message.creator.name}
              time={message.createdAt}
            />
            <Grid item className={classes.maxWidthText}>
              {children}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container wrap="nowrap" justify="center" lg={2}>
          {isHovered && <MessageButtons message={message} user={user} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessagePane;
