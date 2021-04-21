import React from "react";

import defaultAvatar from "../../../images/defaultAvatar.png";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, Box, Container, Grid, IconButton, Link } from "@material-ui/core";

interface AboutProps {
  user?: {
    displayName?: string;
    localTime?: Date;
    phoneNumber?: number;
    email?: string;
  };
  channel?: {
    name: string;
    topic?: string;
    description?: string;
    dateCreated: Date;
    channelOwner: object;
  };
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
          {user.localTime && (
            <Grid container direction="column">
              <Typography variant="subtitle1">Local time</Typography>
              <Typography variant="subtitle2">{}</Typography>
            </Grid>
          )}
          {user.displayName && (
            <Grid container direction="column">
              <Typography variant="subtitle1">Display name</Typography>
              <Typography variant="subtitle2">{}</Typography>
            </Grid>
          )}
          {user.displayName && (
            <Grid container direction="column">
              <Typography variant="subtitle1">Display name</Typography>
              <Typography variant="subtitle2">{}</Typography>
            </Grid>
          )}
        </>
      );
    };

  if (channel) {content = () => {
      return (
        <Grid direction="column" className={classes.fullWidht} >
          <Container disableGutters className={classes.channelAboutItem}>
            <Typography variant="subtitle1">Topic</Typography>
            <Typography variant="subtitle2">
              {channel.topic ? channel.topic : "What's up for discussion?"}
            </Typography>
            <button>Edit</button>
          </Container>
          <Container disableGutters className={classes.channelAboutItem}>
            <Typography variant="subtitle1">Description</Typography>
            <Typography variant="subtitle2">
              {channel.description
                ? channel.description
                : "Describe what this channel is so people can find it."}
            </Typography>
            <button>Edit</button>
          </Container>
          <Grid container justify="space-between" wrap="nowrap" alignItems="center" className={classes.channelAboutItem}>
            <IconButton disableRipple className={classes.smallButton}><Avatar className={classes.small}  alt="User photo" src={defaultAvatar} /></IconButton>
            <Link variant="subtitle2">
              Created on {channel.dateCreated.toDateString()}
            </Link>
          </Grid>
        </Grid>
      );
    };
}

console.log(content)
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
