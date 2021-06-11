import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { MembersContent } from "./Content/MembersContent";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentMembers,
  fetchCurrentMembers,
} from "../../../store/modules/currentMembers/currentMembers";
import {
  selectCurrentMembers,
  selectCurrentMembersLoadingState,
} from "../../../store/modules/currentMembers/selectors";
import { LoadingCurrentMembersState } from "../../../store/modules/currentMembers/types";
import { CentralCircularProgress } from "../../CentralCircularProgress";

export const MembersWorkspace = () => {
  const dispatch = useDispatch();

  const membersLoadingState = useSelector(selectCurrentMembersLoadingState);

  const members = useSelector(selectCurrentMembers);

  React.useEffect(() => {
    dispatch(fetchCurrentMembers());

    return function clearMembers() {
      dispatch(clearCurrentMembers());
    };
  }, [dispatch]);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={
          <>
            <Typography variant="h6">People</Typography>
            <Typography variant="caption">
              {members && members.length} members
            </Typography>
          </>
        }
        rightSideContent={
          <>
            <Button>Invite people</Button>
          </>
        }
      />
      <WorkspaceContent
        children={
          membersLoadingState === LoadingCurrentMembersState.LOADING ? (
            <CentralCircularProgress />
          ) : (
            <MembersContent members={members} />
          )
        }
      />
    </>
  );
};
