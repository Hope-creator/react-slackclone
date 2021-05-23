import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";


interface NestedListProps {
  listTitle: string;
  children: React.ReactNode | React.ReactNode[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    
  })
);

export const NestedList: React.FC<NestedListProps> = ({
  listTitle,
  children,
}: NestedListProps): React.ReactElement => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem dense button onClick={handleClick}>
        {open ? (
          <ArrowDropDownIcon color="primary" />
        ) : (
          <ArrowRightIcon color="primary" />
        )}
        <ListItemText
          primaryTypographyProps={{ color: "primary" }}
          primary={listTitle}
        />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </List>
  );
};
