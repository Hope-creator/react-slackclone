import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchMessages } from "../../store/modules/messages/messages";
import { selectMessages } from "../../store/modules/messages/selectors";
import { WorkspaceContent } from "./WorkspaceContent";
import { WorkspaceHeader } from "./WorkspaceHeader";

export const Workspace = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const path = history.location.pathname;
  const messages = useSelector(selectMessages);
  const currentConversation = useSelector(selectMessages);
  console.log(messages)

  React.useEffect(() => {
      if(path.length === 25) {
          const fetchPath = path.split("").slice(1).join("");
          dispatch(fetchMessages(fetchPath));
      }
  }, [path, dispatch]);

  if (path.length === 25) {
  }

  return (
    <>
      <WorkspaceHeader />
      <WorkspaceContent />
    </>
  );
};
