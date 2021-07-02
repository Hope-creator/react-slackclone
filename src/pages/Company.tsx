import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../store/modules/user/selectors";
import {
  deleteOneConversation,
  addOneConversation,
  updateConversation,
} from "../store/modules/conversations/conversations";
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
  selectInfoSideItem,
  selectInfoSideItemType,
  selectIsInfoSideLoaded,
} from "../store/modules/infoSide/selectors";
import { InfoItemTypeState } from "../store/modules/infoSide/types";
import socket from "../services/socket/socket";
import { IConversation } from "../store/modules/conversations/types";
import { addUser, updateOneUsers } from "../store/modules/users/users";
import {
  selectIsUsersLoaded,
  selectUsers,
} from "../store/modules/users/selectors";
import { IUser } from "../store/modules/user/types";
import { deleteUserConversation } from "../store/modules/user/user";
import { updateOneSideInfoMembers } from "../store/modules/SideInfoMembers/SideInfoMembers";
import { updateUserMessages } from "../store/modules/messages/messages";
import { updateOneCurrentUsers } from "../store/modules/currentUsers/currentUsers";
import { updateInfoSideUser } from "../store/modules/infoSide/infoSide";
import { updateCurrentDialogPartner } from "../store/modules/currentDialog/currentDialog";
import { updateOneCurrentAllDialogs } from "../store/modules/currentAllDialogs/currentAllDialogs";
import { updateOneConversationMembers } from "../store/modules/conversationMembers/conversationMembers";
import { selectIsSideInfoMembersLoaded } from "../store/modules/SideInfoMembers/selectors";
import { selectIsMessagesLoaded } from "../store/modules/messages/selectors";
import { selectIsCurrentUsersLoaded } from "../store/modules/currentUsers/selectors";
import { selectIsConversationsMembersLoaded } from "../store/modules/conversationMembers/selectors";
import { selectIsCurrentAllDialogsLoaded } from "../store/modules/currentAllDialogs/selectors";
import { selectIsCurrentDialogLoaded } from "../store/modules/currentDialog/selectors";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    companyWrapper: {
      height: "100vh",
      overflow: "hidden",
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
    headerLowRes: {
      width: "100%",
      height: 40,
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    navText: {
      [theme.breakpoints.down("xs")]: {
        cursor: "pointer",
        color: "#fff",
      },
    },
    navTextActive: {
      [theme.breakpoints.down("xs")]: {
        cursor: "pointer",
        color: "#a6c7ff",
      },
    },
    visible: {
      [theme.breakpoints.down("xs")]: {
        visibility: "visible",
      },
    },
    hidden: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

export const Company = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);

  const history = useHistory();
  const dispatch = useDispatch();
  const conversations = useSelector(selectConversations);
  const itemType = useSelector(selectInfoSideItemType);
  const itemInfo = useSelector(selectInfoSideItem);

  /*
    --------- Start visible content
    * Visible content will work on resolution width < 600px
  */

  const [content, setContent] = React.useState<string>("nav");

  const isActiveVisible = (visibleContent: string) =>
    content === visibleContent ? classes.navTextActive : classes.navText;

  const isVisible = (visibleContent: string) =>
    content === visibleContent ? classes.visible : classes.hidden;

  const setVisible = (visibleContent: string) => {
    setContent(visibleContent);
  };

  React.useEffect(() => {
    if (history.location.pathname !== "/") {
      setVisible("work");
    }
  }, [history.location.pathname]);

  React.useEffect(() => {
    if (itemInfo) {
      setVisible("info");
    } else {
      setVisible("nav");
    }
  }, [itemInfo]);

  /*
    --------- End visible content
  */

  const isUsersLoaded = useSelector(selectIsUsersLoaded);
  const isSideInfoMembersLoaded = useSelector(selectIsSideInfoMembersLoaded);
  const isMessagesLoaded = useSelector(selectIsMessagesLoaded);
  const isCurrentUsersLoaded = useSelector(selectIsCurrentUsersLoaded);
  const isInfoSideLoaded = useSelector(selectIsInfoSideLoaded);
  const isCurrentDialogLoaded = useSelector(selectIsCurrentDialogLoaded);
  const isCurrentAllDialogsLoaded = useSelector(
    selectIsCurrentAllDialogsLoaded
  );
  const isConversationMembersLoaded = useSelector(
    selectIsConversationsMembersLoaded
  );

  const handleListenerNewConversation = React.useCallback(
    (conversation) => {
      dispatch(addOneConversation(conversation));
    },
    [dispatch]
  );

  const handleListenerConversationUpdate = React.useCallback(
    (conversation: IConversation) => {
      dispatch(updateConversation(conversation));
    },
    [dispatch]
  );

  const handleListenerConversationKicked = React.useCallback(
    (conversation: IConversation) => {
      dispatch(deleteUserConversation(conversation._id));
      if (conversation.is_private) {
        dispatch(deleteOneConversation(conversation._id));
      }
    },
    [dispatch]
  );

  const handleListenerNewUser = React.useCallback(
    (user: IUser) => {
      dispatch(addUser(user));
    },
    [dispatch]
  );

  const handleListenerUpdateUser = React.useCallback(
    (user: IUser) => {
      if (isUsersLoaded) dispatch(updateOneUsers(user));
      if (isSideInfoMembersLoaded) dispatch(updateOneSideInfoMembers(user));
      if (isMessagesLoaded) dispatch(updateUserMessages(user));
      if (isCurrentUsersLoaded) dispatch(updateOneCurrentUsers(user));
      if (isInfoSideLoaded) dispatch(updateInfoSideUser(user));
      if (isCurrentDialogLoaded) dispatch(updateCurrentDialogPartner(user));
      if (isCurrentAllDialogsLoaded) dispatch(updateOneCurrentAllDialogs(user));
      if (isConversationMembersLoaded)
        dispatch(updateOneConversationMembers(user));
    },
    [
      dispatch,
      isUsersLoaded,
      isSideInfoMembersLoaded,
      isMessagesLoaded,
      isCurrentUsersLoaded,
      isInfoSideLoaded,
      isCurrentDialogLoaded,
      isCurrentAllDialogsLoaded,
      isConversationMembersLoaded,
    ]
  );

  useEffect(() => {
    if (user) {
      socket.on("SERVER:NEW_USER", handleListenerNewUser);
      socket.on("SERVER:UPDATE_USER", handleListenerUpdateUser);

      socket.on("SERVER:CONVERSATION_CREATED", handleListenerNewConversation);
      socket.on("SERVER:CONVERSATION_UPDATE", handleListenerConversationUpdate);
      socket.on("SERVER:CONVERSATION_KICKED", handleListenerConversationKicked);
    }
    return () => {
      socket.removeListener("SERVER:NEW_USER", handleListenerNewUser);
      socket.removeListener("SERVER:UPDATE_USER", handleListenerUpdateUser);

      socket.removeListener(
        "SERVER:CONVERSATION_CREATED",
        handleListenerNewConversation
      );
      socket.removeListener(
        "SERVER:CONVERSATION_UPDATE",
        handleListenerConversationUpdate
      );
      socket.removeListener(
        "SERVER:CONVERSATION_KICKED",
        handleListenerConversationKicked
      );
    };
  }, [
    user,
    dispatch,
    handleListenerNewConversation,
    handleListenerConversationUpdate,
    handleListenerNewUser,
    handleListenerConversationKicked,
    handleListenerUpdateUser,
  ]);

  if (!user) {
    history.push("/get-started");
    return null;
  } else {
    const company = user.company;

    return (
      <div className={classes.companyWrapper}>
        <CompanyHeader user={user} />
        <Grid // Navigation in visible content <600px
          alignItems="center"
          container
          className={classes.headerLowRes}
          justify="space-around"
        >
          <Typography
            onClick={() => setVisible("nav")}
            className={isActiveVisible("nav")}
          >
            Navigation
          </Typography>
          <Typography
            onClick={() => setVisible("work")}
            className={isActiveVisible("work")}
          >
            Workspace
          </Typography>
          <Typography
            onClick={() => setVisible("info")}
            className={isActiveVisible("info")}
          >
            Info
          </Typography>
        </Grid>
        <Grid container wrap="nowrap" className={classes.companyContentWrapper}>
          <Grid
            item
            xs={12} // if width < 600px only 1 field will be visible
            sm={3}
            className={classes.channelSidebar + " " + isVisible("nav")}
          >
            <CompanyMenuButton
              buttonClassName={classes.companyMenuButton}
              companyName={company.name}
            >
              <CompanyMenuContent company={company} />
            </CompanyMenuButton>
            <Navbar me={user} users={users} conversations={conversations} />
          </Grid>
          <Grid
            item
            xs={12} // if width < 600px only 1 field will be visible
            sm={6}
            className={classes.workspace + " " + isVisible("work")}
          >
            <Workspace user={user} />
          </Grid>
          {itemType !== InfoItemTypeState.NONE && itemInfo !== undefined ? (
            <Grid
              className={classes.rightSideInfoWrapper + " " + isVisible("info")}
              xs={12} // if width < 600px only 1 field will be visible
              item
              sm={3}
            >
              <RightSideBlock user={user} item={itemInfo} type={itemType} />
            </Grid>
          ) : null}
        </Grid>
      </div>
    );
  }
};
