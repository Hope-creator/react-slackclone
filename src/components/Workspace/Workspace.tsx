import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchCurrentConversation } from "../../store/modules/currentConversation/currentConversation";
import { selectCurrentConversation, selectMessages } from "../../store/modules/currentConversation/selectors";
import { WorkspaceContent } from "./WorkspaceContent";
import { WorkspaceHeader } from "./WorkspaceHeader";

export const Workspace = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const path = history.location.pathname;
  const messages = useSelector(selectMessages);
  const currentConversation = useSelector(selectCurrentConversation);

  React.useEffect(() => {
      if(path.length === 25) {
          const fetchPath = path.split("").slice(1).join("");
          dispatch(fetchCurrentConversation(fetchPath))
      }
  }, [path, dispatch]);


  return (
    <>
      <WorkspaceHeader conversation={currentConversation} />
      <WorkspaceContent messages={messages} />
    </>
  );
};
