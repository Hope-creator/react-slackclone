import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../store/modules/user/selectors";
import { fetchConversations } from "../store/modules/conversations/conversations";
import { selectConversations } from "../store/modules/conversations/selectors";

// # Components
import { RightSideBlock } from "../components/RightSideBlock";
import CompanyHeader from "../components/CompanyHeader";
import { CompanyMenuContent } from "../components/LeftSideBlock/CompanyMenuContent";
import { Navbar } from "../components/LeftSideBlock/Navbar";
import { CompanyMenuButton } from "../components/LeftSideBlock/CompanyMenuButton";

// #Mui
import Grid from "@material-ui/core/Grid";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Workspace } from "../components/Workspace/Workspace";
import {
  selectCurrentInfoItem,
  selectCurrentInfoItemType,
} from "../store/modules/currentInfo/selectors";
import { InfoItemTypeState } from "../store/modules/currentInfo/types";
import socket from "../services/socket/socket";

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
    workspace: {
      height: "100%",
      borderLeft: "1px solid rgb(233,227,230)",
      borderRight: "1px solid rgb(233,227,230)",
      maxHeight: "100%",
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
  const history = useHistory();
  const dispatch = useDispatch();
  const conversations = useSelector(selectConversations);
  const itemType = useSelector(selectCurrentInfoItemType);
  const itemInfo = useSelector(selectCurrentInfoItem);

  useEffect(() => {
    if (user) {
      dispatch(fetchConversations());
      socket.on("SERVER:CONVERSATION_CREATED", () => dispatch(fetchConversations()));
      socket.on("SERVER:NEW_MESSAGE", () => dispatch(fetchConversations()));
    }
    return () => {
      socket.removeListener("SERVER:DIALOG_CREATED", () =>
        dispatch(fetchConversations())
      );
      socket.removeListener("SERVER:NEW_MESSAGE", () =>
        dispatch(fetchConversations())
      );
    };
  }, [user, dispatch]);

  if (!user) {
    history.push("/get-started");
    return null;
  } else {
    const company = user.company;

    return (
      <div className={classes.companyWrapper}>
        <CompanyHeader user={user} />
        <Grid container wrap="nowrap" className={classes.companyContentWrapper}>
          <Grid item xs={3} className={classes.channelSidebar}>
            <CompanyMenuButton
              buttonClassName={classes.companyMenuButton}
              companyName={company.name}
            >
              <CompanyMenuContent company={company} />
            </CompanyMenuButton>
            <Navbar conversations={conversations} />
          </Grid>
          <Grid item xs className={classes.workspace}>
            <Workspace />
          </Grid>
          {itemType !== InfoItemTypeState.NONE && itemInfo !== undefined ? (
            <Grid className={classes.rightSideInfoWrapper} item xs={3}>
              <RightSideBlock item={itemInfo} type={itemType} />
            </Grid>
          ) : null}
        </Grid>
      </div>
    );
  }
};
