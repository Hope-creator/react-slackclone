import React from "react";

import { Grid, IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import FindInPageOutlinedIcon from "@material-ui/icons/FindInPageOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

interface IContentButtonsProps {
  name: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    buttonsWrapper: {
      padding: "18px 0",
      borderBottom: "1px solid rgb(233,227,230)",
    },
    leaveButton: {
      color: "#e01e5a",
      "&:hover": {
        backgroundColor: "#ff6a9824",
      },
    },
  })
);

export const ContentButtons: React.FC<IContentButtonsProps> = ({
  name,
}: IContentButtonsProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.buttonsWrapper}
      wrap="wrap"
      justify="space-around"
      alignItems="center"
    >
      <IconButton>
        <PersonAddOutlinedIcon />
        Add
      </IconButton>
      <IconButton>
        <FindInPageOutlinedIcon />
        Find
      </IconButton>
      <IconButton>
        <CreateOutlinedIcon />
        Rename
      </IconButton>
      <IconButton className={classes.leaveButton}>
        <ExitToAppOutlinedIcon />
        Leave
      </IconButton>
    </Grid>
  );
};
