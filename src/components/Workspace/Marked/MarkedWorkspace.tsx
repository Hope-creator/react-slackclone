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
} from "../../../store/modules/messages/selectors";
import { MarkedContent } from "./Content/MarkedContent";

interface IMarkedWorkspaceProps {
  user: IUser;
}

export const MarkedWorkspace: React.FC<IMarkedWorkspaceProps> = ({ user }) => {
  const dispatch = useDispatch();
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
            <MarkedContent user={user} messages={messages} />
        }
      />
    </>
  );
};
