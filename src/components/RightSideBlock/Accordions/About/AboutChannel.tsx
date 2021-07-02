import React from "react";
import { ConvDescriptionEditModal } from "../../../ConvDescriptionEditModal";
import { ConvTopicEditModal } from "../../../ConvTopicEditModal";
import { Button, Container, Grid, Link, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IConversation } from "../../../../store/modules/conversations/types";

interface IAboutChannelProps {
  channel: IConversation;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    channelAboutItem: {
      backgroundColor: "rgba(29,28,29,.04)",
      padding: "12px 16px",
      marginBottom: theme.spacing(0.1),
    },
    fullWidht: {
      width: "100%",
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    smallButton: {
      padding: 0,
      borderRadius: "50%",
    },
    channelAboutHeaderText: {
      color: "rgba(28,28,28,0.7)",
      fontSize: 13,
      fontWeight: 700,
    },
    channelAboutContentText: {
      color: "rgba(28,28,28,0.7)",
      fontSize: 15,
    },
    channelAboutButton: {
      padding: 0,
      color: theme.palette.secondary.main,
      width: "100%",
    },
  })
);

export const AboutChannel: React.FC<IAboutChannelProps> = ({ channel }) => {
  const classes = useStyles();

  return (
    <Grid direction="column" className={classes.fullWidht}>
      <Container disableGutters className={classes.channelAboutItem}>
        <Typography className={classes.channelAboutHeaderText}>
          Topic
        </Typography>
        <Typography className={classes.channelAboutContentText}>
          {channel.topic ? channel.topic : "What's up for discussion?"}
        </Typography>
        <ConvTopicEditModal
          conversation={channel}
          opener={
            <Button size="small" className={classes.channelAboutButton}>
              Edit
            </Button>
          }
        />
      </Container>
      <Container disableGutters className={classes.channelAboutItem}>
        <Typography className={classes.channelAboutHeaderText}>
          Description
        </Typography>
        <Typography className={classes.channelAboutContentText}>
          {channel.description
            ? channel.description
            : "Describe what this channel is so people can find it."}
        </Typography>
        <ConvDescriptionEditModal
          conversation={channel}
          opener={<Button className={classes.channelAboutButton}>Edit</Button>}
        />
      </Container>
      <Grid
        container
        justify="space-between"
        wrap="nowrap"
        alignItems="center"
        className={classes.channelAboutItem}
      >
        <Link variant="subtitle2">
          Created on {new Date(channel.createdAt).toDateString()}
        </Link>
      </Grid>
    </Grid>
  );
};
