import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { UsersContent } from "./Content/UsersContent";
import { useSelector } from "react-redux";
import {
  selectCurrentUsersTotalCount
} from "../../../store/modules/currentUsers/selectors";

export const UsersWorkspace = () => {

  const totalUserCount = useSelector(selectCurrentUsersTotalCount);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={
          <>
            <Typography variant="h6">People</Typography>
            <Typography variant="caption">
              {totalUserCount} Users
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
            <UsersContent/>
        }
      />
    </>
  );
};
