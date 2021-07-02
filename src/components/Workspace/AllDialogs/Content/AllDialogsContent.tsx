import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IUser } from "../../../../store/modules/user/types";
import { DialogItem } from "../../../DialogItem";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@material-ui/core";
import {
  selectCurrentAllDialogs,
  selectCurrentAllDialogsCount,
  selectCurrentAllDialogsPage,
  selectCurrentAllDialogsTotalCount,
} from "../../../../store/modules/currentAllDialogs/selectors";
import {
  clearCurrentAllDialogsState,
  fetchCurrentAllDialogs,
} from "../../../../store/modules/currentAllDialogs/currentAllDialogs";

export interface IAllDialogsContentProps {
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export const AllDialogsContent: React.FC<IAllDialogsContentProps> = ({ user }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const partners = useSelector(selectCurrentAllDialogs);

  const pageCurrentAllDialogs = useSelector(selectCurrentAllDialogsPage);
  const countCurrentAllDialogs = useSelector(selectCurrentAllDialogsCount);
  const totalCountCurrentAllDialogs = useSelector(selectCurrentAllDialogsTotalCount);

  React.useEffect(() => {
    dispatch(fetchCurrentAllDialogs());
    return function clearUsers() {
      dispatch(clearCurrentAllDialogsState());
    };
  }, [dispatch]);

  const fetchDataCurrentAllDialogs = () => {
    dispatch(fetchCurrentAllDialogs());
  };

  return (
    <div
      id="scrollableDivAllDialogs"
      className={classes.workspaceContentMessages}
      style={{ height: "100%" }}
    >
      <InfiniteScroll
        scrollableTarget="scrollableDivAllDM"
        dataLength={partners.length}
        next={() => fetchDataCurrentAllDialogs()}
        hasMore={pageCurrentAllDialogs * countCurrentAllDialogs < totalCountCurrentAllDialogs}
        loader={<CircularProgress />}
        style={{ overflowY: "hidden" }}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {partners.map((partner) => (
          <DialogItem me={user} key={partner._id} partner={partner} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
