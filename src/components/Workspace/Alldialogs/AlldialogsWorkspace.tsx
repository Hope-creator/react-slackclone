import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { LeftSideAlldialogs } from "./Header/LeftSideAlldialogs";
import { AlldialogsContent } from "./Content/AlldialogsContent";
import { IUser } from "../../../store/modules/user/types";
import socket from "../../../services/socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { CentralCircularProgress } from "../../CentralCircularProgress";
import {
  selectCurrentDialogs,
  selectCurrentDialogsLoadingState,
} from "../../../store/modules/currentDialogs/selectors";
import { IDialog } from "../../../store/modules/dialogs/types";
import {
  clearCurrentDialogsState,
  fetchCurrentDialogs,
} from "../../../store/modules/currentDialogs/currentDialogs";
import { addOneDialog } from "../../../store/modules/dialogs/dialogs";
import { LoadingCurrentDialogsState } from "../../../store/modules/currentDialogs/types";

interface IAlldialogsWorkspaceProps {
  user: IUser;
}

export const AlldialogsWorkspace: React.FC<IAlldialogsWorkspaceProps> = ({
  user,
}) => {
  const dispatch = useDispatch();
  const dialogsLoadingState = useSelector(selectCurrentDialogsLoadingState);
  const dialogs = useSelector(selectCurrentDialogs);

  React.useEffect(() => {
    dispatch(fetchCurrentDialogs());

    return function clearCurrentDialogs() {
      dispatch(clearCurrentDialogsState());
    };
  }, [dispatch]);

  const handleListener = React.useCallback(
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
  }, [handleListener]);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={<LeftSideAlldialogs />}
        rightSideContent={<></>}
      />
      <WorkspaceContent
        children={
          dialogsLoadingState === LoadingCurrentDialogsState.LOADING ? (
            <CentralCircularProgress />
          ) : (
            <AlldialogsContent user={user} dialogs={dialogs} />
          )
        }
      />
    </>
  );
};
