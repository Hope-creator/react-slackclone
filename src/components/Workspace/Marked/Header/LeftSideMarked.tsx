import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export const LeftSideMarked = () => {
  return (
    <Grid container wrap="nowrap" direction="column">
      <Typography variant="subtitle2" color="initial">
        Saved items
      </Typography>
    </Grid>
  );
};
