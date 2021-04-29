import {
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles } from "@material-ui/core/styles";

interface HeaderProps {
  headerTitle: string;
  headerSubText?: string;
  handleClick?: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    headerContainer: {
      width: "100%",
      height: "64px",
      borderBottom: "1px solid rgb(233,227,230)",
      padding: "0 16px",
    },
    headerTitle: {
      fontWeight: 700,
    },
  })
);

export const Header: React.FC<HeaderProps> = ({
  headerTitle,
  headerSubText,
  handleClick,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.headerContainer}
    >
      <Grid>
        <Typography variant="subtitle2" className={classes.headerTitle}>
          {headerTitle}
        </Typography>
        <Typography>{headerSubText}</Typography>
      </Grid>
      <Tooltip title="Close">
        <IconButton onClick={handleClick}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default Header;
