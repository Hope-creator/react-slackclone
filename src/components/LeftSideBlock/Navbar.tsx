import React, { useCallback } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SidebarListCreator } from "../../functions/SidebarListCreator";
import { MoreMenu } from "../MoreMenu";
import { NestedList } from "../NestedList";
import { Channel } from "../Channel";
import { DirectMessageListItem } from "../DirectMessageListItem";
import { IConversation } from "../../store/modules/conversations/types";

import Box from "@material-ui/core/Box";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { JoinAllModal } from "../JoinAllModal";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { CreateConversationModal } from "../CreateConversationlModal";
import { IUser } from "../../store/modules/user/types";
import { IDialog } from "../../store/modules/dialogs/types";

interface INavbarProps {
  conversations: IConversation[];
  dialogs: IDialog[];
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export const Navbar: React.FC<INavbarProps> = ({
  conversations,
  dialogs,
  user,
}: INavbarProps) => {
  const classes = useStyles();
  const standartList = useCallback(
    () =>
      ["Saved items", "More"].map((item) => (
        <SidebarListCreator key={item} componentName={item} />
      )),
    []
  );

  return (
    <Box className={classes.channelSideBarItemsWrapper}>
      <List>
        {standartList()}
        <MoreMenu />
      </List>
      <NestedList listTitle="Channels">
        {conversations.map(channel => (
          <Channel key={channel._id} channel={channel} />
        ))}
        <CreateConversationModal
          opener={
            <ListItem dense button>
              <ListItemIcon>
                <AddBoxOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ color: "primary" }}>
                Add channel
              </ListItemText>
            </ListItem>
          }
        />
        <JoinAllModal
          opener={
            <ListItem dense button>
              <ListItemIcon>
                <PlaylistAddIcon color="primary" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ color: "primary" }}>
                Join all channels
              </ListItemText>
            </ListItem>
          }
        />
      </NestedList>
      <NestedList listTitle="Direct messages">
        {dialogs.map((dialog) => (
          <DirectMessageListItem key={dialog._id} user={user} dialog={dialog} />
        ))}
      </NestedList>
    </Box>
  );
};
