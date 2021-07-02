import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid/Grid";

export const Files = () => {
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
