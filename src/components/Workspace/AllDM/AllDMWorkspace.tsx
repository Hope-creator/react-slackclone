import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { LeftSideAlldialogs } from "./Header/LeftHeaderAllDM";
import { AllDMContent } from "./Content/AllDMContent";
import { IUser } from "../../../store/modules/user/types";
import socket from "../../../services/socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { CentralCircularProgress } from "../../CentralCircularProgress";
import { IDialog } from "../../../store/modules/dialogs/types";
import { addOneDialog } from "../../../store/modules/dialogs/dialogs";
import { selectUsers } from "../../../store/modules/users/selectors";
import { selectCurrentAllDM } from "../../../store/modules/currentAllDM/selectors";
import { clearCurrentAllDMState, fetchCurrentAllDM } from "../../../store/modules/currentAllDM/currentAllDM";

interface IAllDMWorkspaceProps {
  user: IUser;
}

export const AllDMWorkspace: React.FC<IAllDMWorkspaceProps> = ({
  user,
}) => {
  /*const dispatch = useDispatch();
  const users = useSelector(selectCurrentAllDM);*/

  

  /*const handleListener = React.useCallback(
    (dialog: IDialog) => {
      dispatch(addOneDialog(dialog));
    },
    [dispatch]
  );

  React.useEffect(() => {
    socket.addEventListener("SERVER:NEW_DIALOG", handleListener);
    return function cleanUp() {
      socket.removeEventListener("SERVER:NEW_DIALOG", handleListener);
    };
  }, [handleListener]);*/

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
