import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { SearchCompanyForm } from "./SearchCompanyForm";
import { DirectMessageListItem } from "./DirectMessageListItem";

import { Channel } from "./Channel";

import {
  selectSearch,
  selectSearchedResult,
  selectSearchLoadingState,
  selectSearchPageConversations,
  selectSearchPageUsers,
  selectSearchTotalCountConversations,
  selectSearchTotalCountUsers,
} from "../store/modules/search/selectors";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../store/modules/user/types";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import {
  LoadingSearchState,
  SearchItemType,
} from "../store/modules/search/types";
import {
  clearSearchState,
  fetchSearchConversations,
  fetchSearchUsers,
} from "../store/modules/search/search";
import { selectSearchCount } from "../store/modules/search/selectors";
import InfiniteScroll from "react-infinite-scroll-component";
import { SidebarListCreator } from "../functions/SidebarListCreator";
import { IConversation } from "../store/modules/conversations/types";

interface ISearchCompanyButtonProps {
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    contentContainer: {
      width: "750px",
      height: "250px",
      overflowY: "auto",
      overflowX: "hidden",
      maxHeight: "100%",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#A493A7",
        borderRadius: "4px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "350px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "250px",
      },
    },
    styledBottomBlock: {
      margin: "auto 0",
      width: "100%",
      backgroundColor: "rgba(248,248,248, 1)",
      height: "40px",
      textAlign: "end",
    },
    closeIcon: {
      padding: "0",
      height: "100%",
      width: "40px",
    },
    searchBlock: {
      textAlign: "start",
      width: "auto",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    searchBlockIcon: {
      color: "rgb(210,210,210)",
      fontSize: 20,
      padding: 0,
      marginLeft: "auto"
    },
  })
);

export const SearchCompanyButton: React.FC<ISearchCompanyButtonProps> = ({
  user,
}) => {
  const classes = useStyles();

  const search = useSelector(selectSearch);

  const searchLoadingState = useSelector(selectSearchLoadingState);

  const dispatch = useDispatch();

  const handleClearSearchState = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      dispatch(clearSearchState());
    },
    [dispatch]
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const pageSearchUsers = useSelector(selectSearchPageUsers);
  const pageSearchConversations = useSelector(selectSearchPageConversations);

  const searchedResults = useSelector(selectSearchedResult);

  const totalCountUsers = useSelector(selectSearchTotalCountUsers);
  const totalCountConversations = useSelector(
    selectSearchTotalCountConversations
  );

  const count = useSelector(selectSearchCount);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchDataSearch = () => {
    dispatch(fetchSearchConversations());
    dispatch(fetchSearchUsers());
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-company-popover" : undefined;

  return (
    <>
      <Button
        className={classes.button}
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <div className={classes.searchBlock}>Search: {search}</div>
        {searchLoadingState === LoadingSearchState.NEVER ? (
          <SearchIcon className={classes.searchBlockIcon} />
        ) : (
          <IconButton
            className={classes.searchBlockIcon}
            onClick={handleClearSearchState}
          >
            <CancelIcon className={classes.searchBlockIcon} />
          </IconButton>
        )}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <>
          <div id="scrollableDivSearch" className={classes.contentContainer}>
            <SearchCompanyForm />
            <Divider />

            <InfiniteScroll
              dataLength={searchedResults.length}
              scrollableTarget="scrollableDivSearch"
              style={{ overflowY: "hidden" }}
              next={() => fetchDataSearch()}
              hasMore={
                pageSearchUsers * count < totalCountUsers ||
                pageSearchConversations * count < totalCountConversations
              }
              loader={<></>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {searchedResults.map((result) => {
                if (result.type === SearchItemType.CUSTOM) {
                  return (
                    <div key={result.item as string} onClick={handleClose}>
                      <SidebarListCreator
                        componentName={result.item as string}
                      />
                    </div>
                  );
                }
                if (result.type === SearchItemType.CONVERSATION) {
                  return (
                    <div
                      key={(result.item as IConversation)._id}
                      onClick={handleClose}
                    >
                      <Channel channel={result.item as IConversation} />
                    </div>
                  );
                }
                if (result.type === SearchItemType.USER) {
                  return (
                    <div key={(result.item as IUser)._id} onClick={handleClose}>
                      <DirectMessageListItem
                        user={result.item as IUser}
                        me={user}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </InfiniteScroll>
          </div>
          <div className={classes.styledBottomBlock}>
            <IconButton onClick={handleClose} className={classes.closeIcon}>
              <CancelIcon />
            </IconButton>
          </div>
        </>
      </Popover>
    </>
  );
};
