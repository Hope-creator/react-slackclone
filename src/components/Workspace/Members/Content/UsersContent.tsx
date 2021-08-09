import React from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { UserCard } from "./UserCard";
import { UsersSearchForm } from "../../../UsersSearchForm";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentUsers,
  fetchCurrentUsers,
  setCountCurrentUsers,
  setCurrentUsersSearchName,
} from "../../../../store/modules/currentUsers/currentUsers";
import {
  selectCurrentUsersPage,
  selectCurrentUsersCount,
  selectCurrentUsersTotalCount,
  selectCurrentUsers,
} from "../../../../store/modules/currentUsers/selectors";
import { CircularProgress } from "@material-ui/core";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100%",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.light,
        borderRadius: "4px",
      },
    },
    formContainer: {
      margin: 10,
    },
  })
);

export const UsersContent = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [isInitLoaded, setIsInitLoaded] = React.useState<boolean>(false);

  const { height, width } = useWindowDimensions();

  const users = useSelector(selectCurrentUsers);

  React.useEffect(() => {
    if (height > 0 && width > 0 && !isInitLoaded) {
      // get areas of field and item for know how many items field can contain
      const areaItem = Math.ceil(150 * 250);
      const areaField = Math.ceil(width * height);

      // set count to get items and have scroll based
      // on user height and width
      const howManyItems = Math.ceil(areaField / areaItem);
      dispatch(setCountCurrentUsers(howManyItems));
      dispatch(fetchCurrentUsers());
      setIsInitLoaded(true);
    }
  }, [dispatch, height, width, isInitLoaded]);

  React.useEffect(() => {
    return function clearUsers() {
      dispatch(clearCurrentUsers());
    };
  }, [dispatch]);

  const pageCurrentUsers = useSelector(selectCurrentUsersPage);
  const countCurrentUsers = useSelector(selectCurrentUsersCount);
  const totalCountCurrentUsers = useSelector(selectCurrentUsersTotalCount);

  const formSubmit = React.useCallback(
    (name: string) => {
      dispatch(setCurrentUsersSearchName(name));
      dispatch(fetchCurrentUsers());
    },
    [dispatch]
  );

  const fetchDataCurrentMembers = () => {
    dispatch(fetchCurrentUsers());
  };

  return (
    <Grid
      // ref={setRef}
      id="membersScrollableDiv"
      container
      className={classes.container}
      wrap="nowrap"
      direction="column"
    >
      <Box className={classes.formContainer}>
        <UsersSearchForm formSubmit={formSubmit} />
      </Box>
      <InfiniteScroll
        dataLength={users.length}
        next={() => fetchDataCurrentMembers()}
        style={{ overflow: "hidden" }}
        hasMore={pageCurrentUsers * countCurrentUsers < totalCountCurrentUsers}
        scrollableTarget="membersScrollableDiv"
        loader={<CircularProgress />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid justify="center" container wrap="wrap">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </Grid>
      </InfiniteScroll>
    </Grid>
  );
};
