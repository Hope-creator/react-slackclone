import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { LeftSideAlldialogs } from "./Header/LeftHeaderAllDM";
import { AllDMContent } from "./Content/AllDMContent";
import { IUser } from "../../../store/modules/user/types";

interface IAllDMWorkspaceProps {
  user: IUser;
}

export const AllDMWorkspace: React.FC<IAllDMWorkspaceProps> = ({
  user,
}) => {
  return (
    <>
      <WorkspaceHeader
        leftSideContent={<LeftSideAlldialogs />}
        rightSideContent={<></>}
      />
      <WorkspaceContent
        children={
            <AllDMContent user={user} />
        }
      />
    </>
  );
};
