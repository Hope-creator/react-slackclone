import React from "react";
import { WorkspaceContent } from "./WorkspaceContent";
import { WorkspaceHeader } from "./WorkspaceHeader";

export const DefaultWorkspace = () => {
  return (
    <>
      <WorkspaceHeader />
      <WorkspaceContent />
    </>
  );
};
