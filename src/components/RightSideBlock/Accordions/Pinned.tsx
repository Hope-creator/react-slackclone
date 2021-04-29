import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid/Grid";


export const Pinned: React.FC = () => {

  return (
    <Accordion square>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container justify="space-between">
          <Typography variant="body1">Pinned</Typography>
          <Typography variant="body1">0</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          No items have been pinned yet! Open the context menu on important
          messages or files and choose Pin to general to stick them here.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
