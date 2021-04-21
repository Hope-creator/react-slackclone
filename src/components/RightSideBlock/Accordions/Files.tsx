import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidht: {
      width: "100%",
    },
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  })
);

export const Files: React.FC = () => {
  const classes = useStyles();

  return (
    <Accordion square>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container justify="space-between">
          <Typography variant="body1">Files</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          There are no files to see here right now! But there could be — drag
          and drop any file into the message pane to add it to this
          conversation.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
