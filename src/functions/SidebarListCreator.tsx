import React from "react";

import { SideBarListItem } from "../components/SideBarListItem";
import { pathes } from "../constants";

interface SidebarListCreatorProps {
  componentName: string;
}

export const SidebarListCreator: React.FC<SidebarListCreatorProps> = ({
  componentName,
}: SidebarListCreatorProps): React.ReactElement | null => {
  switch (componentName) {
    case "Saved items":
      return (
        <SideBarListItem path={pathes.SAVED_PAGE}>Saved items</SideBarListItem>
      );
    case "All DMs":
      return <SideBarListItem path={pathes.ALLDMS}>All DMs</SideBarListItem>;
    case "All unreads":
      return (
        <SideBarListItem path={pathes.UNREADS}>All unreads</SideBarListItem>
      );
    case "Channel browser":
      return (
        <SideBarListItem path={pathes.BROWSE_CHANNELS}>
          Channel browser
        </SideBarListItem>
      );
    case "People & user groups":
      return (
        <SideBarListItem path={pathes.MEMBERS}>
          People & user group
        </SideBarListItem>
      );

    default:
      return null;
  }
};
