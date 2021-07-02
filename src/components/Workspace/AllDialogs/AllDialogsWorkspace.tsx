import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { HeaderLeftAllDialogs } from "./Header/HeaderLeftAllDialogs";
import { AllDialogsContent } from "./Content/AllDialogsContent";
import { IUser } from "../../../store/modules/user/types";

interface IAllDialogsWorkspaceProps {
  user: IUser;
}

export const AllDialogsWorkspace: React.FC<IAllDialogsWorkspaceProps> = ({
  user,
}) => {
  return (
    <>
      <WorkspaceHeader
        leftSideContent={<HeaderLeftAllDialogs />}
        rightSideContent={<></>}
      />
      <WorkspaceContent children={<AllDialogsContent user={user} />} />
    </>
  );
};
