import React from "react";

import { WorkspaceContent } from "../WorkspaceContent";
import { WorkspaceHeader } from "../WorkspaceHeader";
import { LeftSideMarked } from "./Header/LeftSideMarked";
import { IUser } from "../../../store/modules/user/types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessagesState,
  fetchMessagesMarked,
} from "../../../store/modules/messages/messages";
import {
  selectMarkedMessages,
  selectMessagesLoadingState,
} from "../../../store/modules/messages/selectors";
import { LoadingMessagesState } from "../../../store/modules/messages/types";
import { MarkedContent } from "./Content/MarkedContent";
import { CentralCircularProgress } from "../../CentralCircularProgress";

interface IMarkedWorkspaceProps {
  user: IUser;
}

export const MarkedWorkspace: React.FC<IMarkedWorkspaceProps> = ({ user }) => {
  const dispatch = useDispatch();
  const messagesLoadingState = useSelector(selectMessagesLoadingState);
  const messages = useSelector(selectMarkedMessages);

  React.useEffect(() => {
    dispatch(fetchMessagesMarked());

    return function clearMessages() {
      dispatch(clearMessagesState());
    };
  }, [dispatch]);

  return (
    <>
      <WorkspaceHeader
        leftSideContent={<LeftSideMarked />}
        rightSideContent={<></>}
      />
      <WorkspaceContent
        children={
          messagesLoadingState === LoadingMessagesState.LOADING ? (
            <CentralCircularProgress />
          ) : (
            <MarkedContent user={user} messages={messages} />
          )
        }
      />
    </>
  );
};
