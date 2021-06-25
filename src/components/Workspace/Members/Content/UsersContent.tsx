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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.light,
        borderRadius: "4px",
      },
    },
    container: {
      height: "100%",
    },
    formContainer: {
      margin: 10,
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

export const UsersContent = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [height, setHeight] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(0);

  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (ref && ref.current) setHeight(ref.current.clientHeight);
    if (ref && ref.current) setWidth(ref.current.clientWidth);
  }, [ref]);

  const users = useSelector(selectCurrentUsers);

  React.useEffect(() => {
    if (ref && ref.current && height > 0 && width > 0) {
      // get areas of field and item for know how many items field can contain
      const areaItem = Math.ceil(150 * 250);
      const areaField = Math.ceil(width * height);

      // set count to get items and have scroll based
      // on user height and width
      const howManyItems = Math.ceil(areaField / areaItem);
      dispatch(setCountCurrentUsers(howManyItems));
      dispatch(fetchCurrentUsers());
    }
    return function clearUsers() {
      dispatch(clearCurrentUsers());
    };
  }, [dispatch, height, width, ref]);

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
    <div ref={ref} style={{ height: "100%" }}>
      <Box className={classes.formContainer}>
        <UsersSearchForm formSubmit={formSubmit} />
      </Box>
      {ref && ref.current && (
        <div>
          <InfiniteScroll
            className={classes.root}
            height={height}
            dataLength={users.length}
            next={() => fetchDataCurrentMembers()}
            hasMore={
              pageCurrentUsers * countCurrentUsers < totalCountCurrentUsers
            }
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
        </div>
      )}
    </div>
  );
};
