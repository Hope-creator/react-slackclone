import React from "react";

import { SideBarListItem } from "../components/SideBarListItem";
import { Pathes, PathesCustomNames } from "../constants";

interface SidebarListCreatorProps {
  componentName: string;
}

export const SidebarListCreator: React.FC<SidebarListCreatorProps> = ({
  componentName,
}: SidebarListCreatorProps): React.ReactElement | null => {
  switch (componentName) {
    case PathesCustomNames.SAVED_ITEMS:
      return (
        <SideBarListItem path={Pathes.SAVED_PAGE}>
          {PathesCustomNames.SAVED_ITEMS}
        </SideBarListItem>
      );
    case PathesCustomNames.ALLDIALOGS:
      return (
        <SideBarListItem path={Pathes.ALLDIALOGS}>
          {PathesCustomNames.ALLDIALOGS}
        </SideBarListItem>
      );
    case PathesCustomNames.ALLUNREADS:
      return (
        <SideBarListItem path={Pathes.UNREADS}>
          {PathesCustomNames.ALLUNREADS}
        </SideBarListItem>
      );
    case PathesCustomNames.CHANNEL_BROWSER:
      return (
        <SideBarListItem path={Pathes.BROWSE_CHANNELS}>
          {PathesCustomNames.CHANNEL_BROWSER}
        </SideBarListItem>
      );
    case PathesCustomNames.PEOPLE_AND_USERS_GROUP:
      return (
        <SideBarListItem path={Pathes.MEMBERS}>
          {PathesCustomNames.PEOPLE_AND_USERS_GROUP}
        </SideBarListItem>
      );

    default:
      return null;
  }
};
