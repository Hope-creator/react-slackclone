import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IUser } from "../../../../store/modules/user/types";
import { DMItem } from "../../../DMItem";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@material-ui/core";
import {
  selectCurrentAllDM,
  selectCurrentAllDMCount,
  selectCurrentAllDMPage,
  selectCurrentAllDMTotalCount,
} from "../../../../store/modules/currentAllDM/selectors";
import {
  clearCurrentAllDMState,
  fetchCurrentAllDM,
} from "../../../../store/modules/currentAllDM/currentAllDM";

export interface IAllDMContentProps {
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

export const AllDMContent: React.FC<IAllDMContentProps> = ({ user }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const partners = useSelector(selectCurrentAllDM);

  const pageCurrentAllDM = useSelector(selectCurrentAllDMPage);
  const countCurrentAllDM = useSelector(selectCurrentAllDMCount);
  const totalCountCurrentAllDM = useSelector(selectCurrentAllDMTotalCount);

  React.useEffect(() => {
    dispatch(fetchCurrentAllDM());
    return function clearUsers() {
      dispatch(clearCurrentAllDMState());
    };
  }, [dispatch]);

  const fetchDataCurrentAllDM = () => {
    dispatch(fetchCurrentAllDM());
  };

  return (
    <div
      id="scrollableDiv"
      className={classes.workspaceContentMessages}
      style={{ height: "100%" }}
    >
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        dataLength={partners.length}
        next={() => fetchDataCurrentAllDM()}
        hasMore={pageCurrentAllDM * countCurrentAllDM < totalCountCurrentAllDM}
        loader={<CircularProgress />}
        style={{ overflowY: "hidden" }}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {partners.map((partner) => (
          <DMItem me={user} key={partner._id} partner={partner} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
