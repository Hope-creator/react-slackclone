import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import Tooltip from "@material-ui/core/Tooltip";
import { UserPopover } from "../UserPopover";
import { IUser } from "../../store/modules/user/types";

interface IMessageHeaderProps {
  text: string;
  time: string;
  user: IUser;
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

export const MessageHeader: React.FC<IMessageHeaderProps> = ({
  text,
  time,
  user,
}) => {
  const classes = useStyles();

  return (
    <Grid alignItems="center" item container className={classes.maxWidthText}>
      <UserPopover
        anchorOriginBlockVertical="bottom"
        anchorOriginBlockHorizontal="center"
        anchorPopupBlockVertical="top"
        anchorPopupBlockHorizontal="center"
        opener={<Typography variant="subtitle2">{text}</Typography>}
        user={user}
      />
      <Tooltip
        placement="top"
        classes={{ tooltipPlacementTop: classes.tooltip }}
        title={format(new Date(time), "PPPppp")}
      >
        <Typography className={classes.timeText} variant="caption">
          {format(new Date(time), "h:mm aa")}
        </Typography>
      </Tooltip>
    </Grid>
  );
};
