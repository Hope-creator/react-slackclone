import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { CreateConversationForm } from "./CreateConversationForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
        height: 125,
        width: 400
    },
  })
);

export const CreateConversation = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems="center" direction="column" >
          <Typography variant="subtitle2">Name</Typography>
          <CreateConversationForm />
      </Grid>
    </Paper>
  );
};
