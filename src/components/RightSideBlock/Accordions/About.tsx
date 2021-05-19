import React from "react";

import defaultAvatar from "../../../images/defaultAvatar.png";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, Button, Container, Grid, IconButton, Link } from "@material-ui/core";
import { IConversation } from "../../../store/modules/conversations/types";

interface AboutProps {
  user?: {
    displayName?: string;
    localTime?: Date;
    phoneNumber?: number;
    email?: string;
  };
  channel?: IConversation
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    channelAboutItem: {
        backgroundColor: "rgba(29,28,29,.04)",
        padding: "12px 16px",
        marginBottom: theme.spacing(0.1)
    },
    fullWidht: {
        width: "100%"
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    smallButton: {
        padding: 0,
        borderRadius: "50%"
    },
    channelAboutHeaderText: {
      color: "rgba(28,28,28,0.7)",
      fontSize: 13,
      fontWeight: 700
    },
    channelAboutContentText: {
      color: "rgba(28,28,28,0.7)",
      fontSize: 15
    },
    channelAboutButton: {
      padding: 0,
      color: theme.palette.secondary.main,
      width: "100%"
    }
  })
);

export const About: React.FC<AboutProps> = ({ user, channel }) => {
  let content = (): React.ReactElement | null => null;

  const classes = useStyles();

  if (user) content = () => {
      return (
        <>
          {user.displayName && (
            <Grid container direction="column">
              <Typography variant="subtitle1">Display name</Typography>
              <Typography variant="subtitle2">{user.displayName}</Typography>
            </Grid>
          )}
        </>
      );
    };

  if (channel) {content = () => {
      return (
        <Grid direction="column" className={classes.fullWidht} >
          <Container disableGutters className={classes.channelAboutItem}>
            <Typography className={classes.channelAboutHeaderText}>Topic</Typography>
            <Typography className={classes.channelAboutContentText}>
              {channel.topic ? channel.topic : "What's up for discussion?"}
            </Typography>
            <Button size="small" className={classes.channelAboutButton}>Edit</Button>
          </Container>
          <Container disableGutters className={classes.channelAboutItem}>
            <Typography className={classes.channelAboutHeaderText}>Description</Typography>
            <Typography className={classes.channelAboutContentText}>
              {channel.purpose
                ? channel.purpose
                : "Describe what this channel is so people can find it."}
            </Typography>
            <Button className={classes.channelAboutButton}>Edit</Button>
          </Container>
          <Grid container justify="space-between" wrap="nowrap" alignItems="center" className={classes.channelAboutItem}>
            <IconButton disableRipple className={classes.smallButton}><Avatar className={classes.small}  alt="User photo" src={defaultAvatar} /></IconButton>
            <Link variant="subtitle2">
              Created on {new Date(channel.createdAt).toDateString()}
            </Link>
          </Grid>
        </Grid>
      );
    };
}

  return (
    <Accordion square>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body1">About</Typography>
      </AccordionSummary>
      <AccordionDetails>{content()}</AccordionDetails>
    </Accordion>
  );
};
