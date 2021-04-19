import React from "react";

import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  Paper,
  MenuItem,
  Divider,
  List,
  Link,
} from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";

import { SimplePopover } from "../components/SimplePopover";
import { CompanyMenuButton } from "../components/CompanyMenuButton";
import { SidebarListCreator } from "../functions/SidebarListCreator";
import { MoreMenu } from "../components/MoreMenu";
import { NestedList } from "../components/NestedList";
import { Channel } from "../components/Channel";
import { DirectMessageListItem } from "../components/DirectMessageListItem";
import { StyledBadge } from "../components/StyledBadge";
import MessagePane from "../components/MessagePane";

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
      backgroundColor: "rgba(248,248,248,1)",
    },
    captionText: {
      paddingLeft: "16px",
    },
    companyMenuButton: {
      backgroundColor: "#FBFAF7",
      height: 64,
      justifyContent: "start",
      fontWeight: 700,
      borderBottom: "1px solid rgb(233,227,230)",
      boxShadow: "none",
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    channelSidebar: {
      backgroundColor: "#FBFAF7",
      height: "100vh",
    },
    workspace: {
      height: "100vh",
      borderLeft: "1px solid rgb(233,227,230)",
      borderRight: "1px solid rgb(233,227,230)",
    },
    workspaceHeader: {
      borderBottom: "1px solid rgb(233,227,230)",
      height: 63,
      padding: "0 16px",
    },
    addTopicText: {
      cursor: "pointer",
      color: "#696969",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
    headerStarButton: {
      fontSize: "1rem",
    },
    workspaceContent: {
      padding: 20,
      overflowY: "scroll",
      height: "70%",
    },
  })
);

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
      <Grid container wrap="nowrap">
        <Grid item xs={3} className={classes.channelSidebar}>
          <CompanyMenuButton
            buttonClassName={classes.companyMenuButton}
            companyName="Test company"
          >
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
                <Typography className={classes.captionText} variant="caption">
                  Administration
                </Typography>
                <MenuItem>Manage members</MenuItem>
                <MenuItem>Manage apps</MenuItem>
              </Paper>
            </SimplePopover>
            <MenuItem>Sign out of Test company</MenuItem>
          </CompanyMenuButton>
          <List>
            {["Mentions & reactions", "Saved items", "More"].map((item) => (
              <SidebarListCreator componentName={item} />
            ))}
            <MoreMenu />
          </List>
          <NestedList buttonText="Add channel" listTitle="Channels">
            {["general", "project"].map((item) => (
              <Channel name={item} />
            ))}
          </NestedList>
          <NestedList listTitle="Direct messages" buttonText="Add teammate">
            {["Ivan", "Bob"].map((user) => (
              <DirectMessageListItem name={user} />
            ))}
          </NestedList>
        </Grid>
        <Grid item xs className={classes.workspace}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.workspaceHeader}
          >
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Link>#general</Link>
                  <Tooltip title="Star channel" aria-label="Star channel">
                    <IconButton size="small">
                      <StarBorderIcon className={classes.headerStarButton} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    className={classes.addTopicText}
                    onClick={() => console.log("type")}
                  >
                    Add a topic
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Tooltip
                title="View all 12 members"
                aria-label="Add people to #general"
              >
                <IconButton>12</IconButton>
              </Tooltip>
              <Tooltip
                title="Add people to #general"
                aria-label="Add people to #general"
              >
                <IconButton size="small">
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Show channel details"
                aria-label="Show channel details"
              >
                <IconButton size="small">
                  <ErrorOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            className={classes.workspaceContent}
            justify="flex-end"
            wrap="nowrap"
          >
            <MessagePane
              header="This space is just for you"
              icon={<QuestionAnswerOutlinedIcon />}
            >
              123
            </MessagePane>
            {new Array(20).fill({
              header: "Ivan",
              avatarSrc:
                "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
            }).map(item=> <MessagePane header={item.header} avatarSrc={item.avatarSrc}><Typography></Typography>MessageMessageMessageMessageMessageMessageMessage MessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage</MessagePane>)}
            <MessagePane
              header="Ivan"
              avatarSrc="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            >
              Hello
            </MessagePane>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          third
        </Grid>
      </Grid>
    </div>
  );
};
