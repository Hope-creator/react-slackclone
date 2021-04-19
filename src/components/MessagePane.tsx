import { Avatar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import React from "react";

interface MessagePaneProps {
  avatarSrc?: string;
  icon?: React.ReactNode;
  header: string;
  children: React.ReactNode;
}

const useStyles = makeStyles(() =>
  createStyles({
        avatar: {
            marginRight: 12,
        },
        icon: {
            marginRight: 8,
            padding: 10,
            backgroundColor: "rgb(244, 237, 228)",
        }
  })
);

export const MessagePane: React.FC<MessagePaneProps> = ({
  avatarSrc,
  icon,
  header,
  children,
}: MessagePaneProps): React.ReactElement => {

    const classes = useStyles();

  return (
    <Grid container wrap="nowrap">
      <Grid item className={icon ? classes.icon : classes.avatar }>
        {avatarSrc ? (
          <Avatar alt={`profile__picture__${avatarSrc}`} src={avatarSrc} />
        ) : icon ? (
          icon
        ) : null}
      </Grid>
      <Grid item>
      <Grid container direction="column">
        <Grid item>{header}</Grid>
        <Grid item>{children}</Grid>
        </Grid>

      </Grid>
    </Grid>
  );
};

export default MessagePane;
