import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { IUser } from "../../../../store/modules/user/types";

interface IHeaderLeftDialogProps {
  partner: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addTopicText: {
      cursor: "pointer",
      color: "#696969",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
    name: {
      display: "block",
      wordBreak: "break-word",
      width: "500px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);

export const HeaderLeftDialog: React.FC<IHeaderLeftDialogProps> = ({
  partner,
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item container wrap="nowrap">
        <Typography
          variant="subtitle2"
          color="initial"
          className={classes.name}
        >
          {partner.name}
        </Typography>
      </Grid>
    </Grid>
  );
};
