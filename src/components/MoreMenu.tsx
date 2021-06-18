import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import { SidebarListCreator } from "../functions/SidebarListCreator";
import Divider from "@material-ui/core/Divider";
import { PathesCustomNames } from "../constants";

const useStyles = makeStyles({
  submenuIcon: {
    fontSize: "1rem",
    paddingRight: "10px",
  },
  paper: {
    width: 300,
  },
});

export const MoreMenu: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-submenu" : undefined;

  return (
    <>
      <ListItem dense button onClick={handleClick}>
        <MoreVertOutlinedIcon color="primary" className={classes.submenuIcon} />
        <ListItemText primaryTypographyProps={{ color: "primary" }}>
          More
        </ListItemText>
      </ListItem>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper className={classes.paper}>
          {[PathesCustomNames.ALLUNREADS, PathesCustomNames.ALLDIALOGS].map((item) => (
            <SidebarListCreator key={item} componentName={item} />
          ))}
          <Divider />
          {[PathesCustomNames.CHANNEL_BROWSER, PathesCustomNames.PEOPLE_AND_USERS_GROUP].map((item) => (
            <SidebarListCreator key={item} componentName={item} />
          ))}
        </Paper>
      </Popover>
    </>
  );
};
