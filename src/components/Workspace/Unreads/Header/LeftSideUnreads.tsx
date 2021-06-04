import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

interface ILeftSideUnreadsProps {
  unreadsCount: number;
}

export const LeftSideUnreads: React.FC<ILeftSideUnreadsProps> = ({
  unreadsCount,
}) => {
  return (
    <Grid container wrap="nowrap" direction="column">
      <Typography variant="subtitle2" color="initial">
        All unreads
      </Typography>
      <Typography variant="caption" color="initial">
        {unreadsCount > 0 && unreadsCount + " messages"} 
      </Typography>
    </Grid>
  );
};
