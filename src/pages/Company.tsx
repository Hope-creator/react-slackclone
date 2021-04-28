import React from "react";

import {
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Paper,
  MenuItem,
  Divider,
  List,
  Link,
  Box,
} from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import { selectUser } from "../store/modules/user/selectors";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";

import { CompanyMenuButton } from "../components/CompanyMenuButton";
import { SidebarListCreator } from "../functions/SidebarListCreator";
import { MoreMenu } from "../components/MoreMenu";
import { NestedList } from "../components/NestedList";
import { Channel } from "../components/Channel";
import { DirectMessageListItem } from "../components/DirectMessageListItem";
import MessagePane from "../components/MessagePane";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { RightSideBlock } from "../components/RightSideBlock";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import CompanyHeader from "../components/CompanyHeader";
import { CompanyMenuContent } from "../components/CompanyMenuContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    companyWrapper: {
      height: "100vh",
    },
    companyContentWrapper: {
      height: "calc(100% - 38px)",
    },
    menuItemWrapper: {
      outline: "none",
      width: "300px",
      backgroundColor: "rgba(248,248,248,1)",
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
    },
    channelSideBarItemsWrapper: {
      overflowY: "auto",
      overflowX: "hidden",
      maxHeight: "calc(100% - 64px)",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.light,
        borderRadius: "4px",
      },
    },
    workspace: {
      height: "100%",
      borderLeft: "1px solid rgb(233,227,230)",
      borderRight: "1px solid rgb(233,227,230)",
      maxHeight: "100%",
    },
    workspaceHeader: {
      borderBottom: "1px solid rgb(233,227,230)",
      height: 64,
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
    workspaceContentGrid: {
      height: "calc(100% - 64px)",
      padding: "0 20px",
    },
    workspaceContentMessages: {
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(29,28,29,.52)",
        borderRadius: "4px",
      },
    },
    textareaSize: {
      resize: "none",
      width: "100%",
    },
    message: {
      wordWrap: "break-word",
    },

    rightSideInfoWrapper: {
      overflowY: "auto",
      overflowX: "hidden",
      maxHeight: "100%",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(29,28,29,.52)",
        borderRadius: "4px",
      },
    },
  })
);

export const Company = () => {
  const classes = useStyles();

  const user = useSelector(selectUser);

  if (!user) {
    return <Redirect to="/get-started" />;
  } else {
    return (
      <div className={classes.companyWrapper}>
        <CompanyHeader user={user} />
        <Grid container wrap="nowrap" className={classes.companyContentWrapper}>
          <Grid item xs={3} className={classes.channelSidebar}>
            <CompanyMenuButton
              buttonClassName={classes.companyMenuButton}
              companyName="Test company"
            >
              <CompanyMenuContent />
            </CompanyMenuButton>
            <Box className={classes.channelSideBarItemsWrapper}>
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
                {[
                  "Ivan",
                  "Bob",
                  "Jerry",
                  "Alex",
                  "Some",
                  "Ivan",
                  "Bob",
                  "Jerry",
                  "Alex",
                  "Some",
                ].map((user) => (
                  <DirectMessageListItem name={user} />
                ))}
              </NestedList>
            </Box>
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
              className={classes.workspaceContentGrid}
              wrap="nowrap"
            >
              <Grid
                container
                item
                className={classes.workspaceContentMessages}
                direction="column"
                wrap="nowrap"
              >
                <MessagePane
                  header="This space is just for you"
                  icon={<QuestionAnswerOutlinedIcon />}
                >
                  123
                </MessagePane>
                {new Array(20)
                  .fill({
                    header: "Ivan",
                    avatarSrc:
                      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                  })
                  .map((item) => (
                    <MessagePane
                      header={item.header}
                      avatarSrc={item.avatarSrc}
                    >
                      <Typography className={classes.message}>
                        MessageMessageMessageMessageMessageMessageMessage
                        MessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage
                      </Typography>
                    </MessagePane>
                  ))}
                <MessagePane
                  header="Ivan"
                  avatarSrc="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                >
                  Hello
                </MessagePane>
              </Grid>
              <Grid item>
                <TextareaAutosize
                  aria-label="Send message"
                  placeholder="Send message to Me"
                  className={classes.textareaSize}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.rightSideInfoWrapper} item xs={3}>
            <RightSideBlock content={user} type="profile" />
          </Grid>
        </Grid>
      </div>
    );
  }
};
