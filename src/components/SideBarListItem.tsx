import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { SideBarListItemIconCreator } from "../functions/SideBarListItemIconCreator";

interface ISideBarListItemProps {
  path: string;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activeBg: {
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    activeIcon: {
      color: "#fff",
    },
    icon: {
      color: theme.palette.primary.main,
    },
  })
);

export const SideBarListItem: React.FC<ISideBarListItemProps> = ({
  path,
  children,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const isPathMatch = (path: string): boolean => {
    return history.location.pathname.match(path) ? true : false;
  };

  const handleClick = (path: string) => {
    history.push(path);
  };

  return (
    <ListItem
      className={isPathMatch(path) ? classes.activeBg : undefined}
      dense
      button
      onClick={() => handleClick(path)}
    >
      <ListItemIcon
        className={isPathMatch(path) ? classes.activeIcon : classes.icon}
      >
        <SideBarListItemIconCreator path={path} />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          className: isPathMatch(path) ? classes.activeIcon : classes.icon,
        }}
      >
        {children}
      </ListItemText>
    </ListItem>
  );
};
