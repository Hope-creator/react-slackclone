import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

interface IWorkspaceHeaderProps {
  leftSideContent?: React.ReactNode;
  rightSideContent?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    workspaceHeader: {
      borderBottom: "1px solid rgb(233,227,230)",
      height: 64,
      padding: "0 16px",
    },
    headerStarButton: {
      fontSize: "1rem",
    },
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

export const WorkspaceHeader: React.FC<IWorkspaceHeaderProps> = ({
  leftSideContent,
  rightSideContent,
}: IWorkspaceHeaderProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.workspaceHeader}
      wrap="nowrap"
    >
      <Grid item xs={10}>
        {leftSideContent}
      </Grid>
      <Grid item alignItems="center" container xs={2} wrap="nowrap" justify="center">
        {rightSideContent}
      </Grid>
    </Grid>
  );
};
