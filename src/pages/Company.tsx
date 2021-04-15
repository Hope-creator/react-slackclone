import React from "react";

import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Badge,
  Avatar,
  Paper,
  MenuItem,
  Divider
} from "@material-ui/core";
import {
  createStyles,
  Theme,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { CompanyMenuButton } from "../components/CompanyMenuButton";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import { SimplePopover } from "../components/SimplePopover";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    companyWrapper: {
      height: "100vh",
    },
    appBar: {
      height: 38,
      backgroundColor: theme.palette.primary.dark,
    },
    toolbar: {
      minHeight: 0,
    },
    iconButton: {
      color: "rgb(210,210,210)",
      padding: "0",
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
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    grid: {
      height: 38,
    },
    menuItemWrapper: {
      outline: "none",
      width: "300px",
      backgroundColor: "rgba(248,248,248,1)",
    },
    menuItemTeam: {
      padding: "20px 24px",
    },
    menuTeamIcon: {
      fontSize: "3rem",
    },
    submenuContainer: {
      width: 300,
      padding: "17px 0",
      backgroundColor: "rgba(248,248,248,1)"
    },
    captionText: {
      paddingLeft: "16px"
    },
    companyMenuButton: {
      backgroundColor: "#FBFAF7",
      justifyContent: "start",
      fontWeight: 700,
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: "#DCEEE4"
      }
    }
  })
);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  })
)(Badge);

export const Company = () => {
  const classes = useStyles();

  return (
    <div className={classes.companyWrapper}>
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
            <Grid container justify="flex-end" xs={3}>
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
                  src="https://images.unsplash.com/photo-1513483460609-1c8a505ea990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                />
              </StyledBadge>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={3}>
          <CompanyMenuButton buttonClassName={classes.companyMenuButton} companyName="Test company">
            <Grid
              wrap="nowrap"
              alignItems="center"
              className={classes.menuItemTeam}
              container
            >
              <DeveloperBoardIcon className={classes.menuTeamIcon} />
              <Typography variant="subtitle1" noWrap>
                Test company name namen amen ame namena mena mename
                <Typography variant="body2" noWrap>
                  Test company name
                </Typography>
              </Typography>
            </Grid>
            <Divider />
            <MenuItem>Invite people to Test Company**</MenuItem>
            <MenuItem>Create a channel</MenuItem>
            <Divider />
              <SimplePopover
                text="Administration"
                anchorOriginBlockVertical="center"
                anchorOriginBlockHorizontal="right"
                anchorPopupBlockVertical="center"
                anchorPopupBlockHorizontal="center"
              >
                <Paper className={classes.submenuContainer}>
                  <Typography className={classes.captionText} variant="caption">Administration</Typography>
                  <MenuItem>Manage members</MenuItem>
                  <MenuItem>Manage apps</MenuItem>
                </Paper>
              </SimplePopover>
              <Divider />
              <MenuItem>Sign out of Test company</MenuItem>
          </CompanyMenuButton>
        </Grid>
        <Grid item xs>
          123
        </Grid>
        <Grid item xs={3}>
          123
        </Grid>
      </Grid>
    </div>
  );
};
