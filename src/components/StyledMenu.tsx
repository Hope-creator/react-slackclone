import React from "react";

import Menu, { MenuProps } from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";

export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    backgroundColor: "rgba(248,248,248,1)",
    width: 300,
  },
})((props: MenuProps) => <Menu {...props} />);
