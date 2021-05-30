import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import Tooltip from "@material-ui/core/Tooltip";

interface IMessageHeaderProps {
  text: string;
  time: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    maxWidthText: {
      width: "100%",
    },
    timeText: {
      color: "rgba(97,97,97,1)",
      marginLeft: 5,
      cursor: "pointer",
    },
    tooltip: {
      backgroundColor: "black",
    },
  })
);

export const MessageHeader: React.FC<IMessageHeaderProps> = ({ text, time }) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.maxWidthText}>
      <Typography variant="subtitle2">
        {text}
        <Tooltip
          placement="top"
          classes={{ tooltipPlacementTop: classes.tooltip }}
          title={format(new Date(time), "PPPppp")}
        >
          <Typography className={classes.timeText} variant="caption">
            {format(new Date(time), "h:mm aa")}
          </Typography>
        </Tooltip>
      </Typography>
    </Grid>
  );
};
