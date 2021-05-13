import React from "react";

import defaultAvatar from "../images/defaultAvatar.png";

import { SimplePopover } from "./SimplePopover";
import { StyledBadge } from "./StyledBadge";

import AppBar from "@material-ui/core/AppBar/AppBar";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Button from "@material-ui/core/Button/Button";
import Avatar from "@material-ui/core/Avatar/Avatar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IUser } from "../store/modules/user/types";
import { AvatarProfileMenu } from "./AvatarProfileMenu";

interface ICompanyHeaderProps {
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      height: 38,
      backgroundColor: theme.palette.primary.dark,
    },
    toolbar: {
      minHeight: 0,
    },
    grid: {
      height: 38,
    },
    iconButton: {
      color: "rgb(210,210,210)",
      padding: "0",
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },

    button: {
      color: "rgb(210,210,210)",
      justifyContent: "start",
      backgroundColor: "rgb(87,37,88)",
      boxShadow: "inset 0 0 0 1px rgb(119 80 120)",
      height: 24,
      margin: "0 10px",
      width: "60%",
      "&:hover": {
        backgroundColor: "rgb(92,44,93)",
        boxShadow: "inset 0 0 0 1px rgb(165 138 165)",
      },
    },
  })
);

export const CompanyHeader: React.FC<ICompanyHeaderProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar
        classes={{
          regular: classes.toolbar,
        }}
      >
        <Grid container alignItems="center">
          <Grid
            classes={{
              root: classes.grid,
            }}
            container
            item
            alignItems="center"
            justify="flex-end"
            xs={9}
          >
            <Tooltip title="History" aria-label="History">
              <IconButton className={classes.iconButton} aria-label="History">
                <AccessTimeIcon />
              </IconButton>
            </Tooltip>
            <Button className={classes.button} variant="outlined">
              Search Test Company
            </Button>
            <Tooltip title="Help" aria-label="Help">
              <IconButton className={classes.iconButton} aria-label="Help">
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid container item justify="flex-end" xs={3}>
            <SimplePopover
              opener={
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar
                    className={classes.avatar}
                    alt="Remy Sharp"
                    src={user ? user.avatar : defaultAvatar}
                  />
                </StyledBadge>
              }
              anchorOriginBlockVertical="bottom"
              anchorOriginBlockHorizontal="center"
              anchorPopupBlockVertical="top"
              anchorPopupBlockHorizontal="center"
            >
              <AvatarProfileMenu user={user} />
            </SimplePopover>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default CompanyHeader;
