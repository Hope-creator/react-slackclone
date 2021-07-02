import React from "react";

import Typography from "@material-ui/core/Typography";
import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { UsersContent } from "./Content/UsersContent";
import { useSelector } from "react-redux";
import {
  selectCurrentUsersTotalCount,
  selectIsCurrentUsersLoaded,
} from "../../../store/modules/currentUsers/selectors";

export const UsersWorkspace = () => {
  const totalUserCount = useSelector(selectCurrentUsersTotalCount);
  const isCurrentUsersLoaded = useSelector(selectIsCurrentUsersLoaded);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={
          <>
            <Typography variant="h6">People</Typography>
            <Typography variant="caption">
              {isCurrentUsersLoaded && totalUserCount} Users
            </Typography>
          </>
        }
        rightSideContent={<></>}
      />
      <WorkspaceContent children={<UsersContent />} />
    </>
  );
};
