import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

interface IWorkspaceContentProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    workspaceContentGrid: {
      height: "calc(100% - 64px)",
      padding: "0 20px",
    },
  })
);

export const WorkspaceContent: React.FC<IWorkspaceContentProps> = ({
  children,
}: IWorkspaceContentProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      className={classes.workspaceContentGrid}
      wrap="nowrap"
    >
      {children}
    </Grid>
  );
};
