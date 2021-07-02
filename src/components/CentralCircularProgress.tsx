import CircularProgress from "@material-ui/core/CircularProgress";
import { CircularProgressProps } from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

export const CentralCircularProgress = withStyles({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
})((props: CircularProgressProps) => <CircularProgress {...props} />);
