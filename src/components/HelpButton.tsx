import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      color: "rgb(210,210,210)",
      padding: "0",
      "&:hover": {
        background: "none",
      },
    },
    contentContainer: {
      width: 150,
      height: 200,
      padding: 20,
      textAlign: "center",
    },
    link: {
      textDecoration: "none",
      fontSize: 14,
    },
    icon: {
      fontSize: 130,
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  })
);

export const HelpButton = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-company-popover" : undefined;

  return (
    <>
      <Tooltip title="Help" aria-label="Help">
        <IconButton
          onClick={handleClick}
          className={classes.iconButton}
          aria-label="Help"
        >
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
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
        <div className={classes.contentContainer}>
          <Typography variant="subtitle2">
            This is a demo project, for any questions
          </Typography>
          <a
            className={classes.link}
            href="https://github.com/Hope-creator/"
            target="_blank"
            rel="noreferrer"
          >
            contact
          </a>
          <a
            href="https://github.com/Hope-creator/slackclone"
            target="_blank"
            rel="noreferrer"
          >
            <IconButton className={classes.iconButton}>
              <GitHubIcon className={classes.icon} />
            </IconButton>
          </a>
        </div>
      </Popover>
    </>
  );
};
