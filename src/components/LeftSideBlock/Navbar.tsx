import React from "react";
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
import { CreateConversationModal } from "../CreateConversationlModal";
import { IUser } from "../../store/modules/user/types";
import { PathesCustomNames } from "../../constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { CentralCircularProgress } from "../CentralCircularProgress";
import { fetchUsers } from "../../store/modules/users/users";
import {
  selectUsersPage,
  selectUsersCount,
  selectUsersTotalCount,
} from "../../store/modules/users/selectors";
import {
  selectConversationsCount,
  selectConversationsPage,
  selectConversationsTotalCount,
} from "../../store/modules/conversations/selectors";
import { fetchConversations } from "../../store/modules/conversations/conversations";

interface INavbarProps {
  conversations: IConversation[];
  users: IUser[];
  me: IUser;
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
    infinityScrollContainer: {
      overflowY: "auto",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.secondary.light,
        borderRadius: "4px",
      },
    },
  })
);

export const Navbar: React.FC<INavbarProps> = ({
  conversations,
  users,
  me,
}: INavbarProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const pageUsers = useSelector(selectUsersPage);
  const countUsers = useSelector(selectUsersCount);
  const totalCountUsers = useSelector(selectUsersTotalCount);

  const pageConversations = useSelector(selectConversationsPage);
  const countConversations = useSelector(selectConversationsCount);
  const totalCountConversations = useSelector(selectConversationsTotalCount);

  const fetchData = () => {
    dispatch(fetchUsers());
  };

  const fetchDataConversations = () => {
    dispatch(fetchConversations());
  };

  return (
    <Box className={classes.channelSideBarItemsWrapper}>
      <List>
        <SidebarListCreator componentName={PathesCustomNames.SAVED_ITEMS} />
        <MoreMenu />
      </List>
      <NestedList listTitle="Channels">
        <div>
          <InfiniteScroll
            className={classes.infinityScrollContainer}
            height={35 * 19}
            /*
             * 35px is height of 1 dialog item, so we render
             * with one less item to see scroll
             * */
            dataLength={conversations.length}
            next={() => fetchDataConversations()}
            hasMore={
              pageConversations * countConversations < totalCountConversations
            }
            loader={<CentralCircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {conversations.map((channel) => (
              <Channel key={channel._id} channel={channel} />
            ))}
          </InfiniteScroll>
        </div>

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
      </NestedList>
      <NestedList listTitle="Direct messages">
        <div>
          <InfiniteScroll
            className={classes.infinityScrollContainer}
            height={35 * 19}
            /*
             * 35px is height of 1 dialog item, so we render
             * with one less item to see scroll
             * */
            dataLength={users.length}
            next={() => fetchData()}
            hasMore={pageUsers * countUsers < totalCountUsers}
            loader={<CentralCircularProgress />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {users.map((user) => (
              <DirectMessageListItem key={user._id} user={user} me={me} />
            ))}
          </InfiniteScroll>
        </div>
      </NestedList>
    </Box>
  );
};
