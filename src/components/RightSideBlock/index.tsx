import { Box } from "@material-ui/core";
import React from "react";
import { IConversation } from "../../store/modules/conversations/types";
import { InfoItemTypeState } from "../../store/modules/currentInfo_side/types";
import { IUser } from "../../store/modules/user/types";
import { Accordeons } from "./Accordions/Accordions";
import { Files } from "./Accordions/Files";
import { ContentButtons } from "./ContentButtons";
import Header from "./Header";
import ProfileInfo from "./ProfileInfo";

interface RightSideBlockProps {
  headerSubText?: string;
  type: string;
  item: IUser | IConversation;
}

export const RightSideBlock: React.FC<RightSideBlockProps> = ({
  type,
  item
}) => {
  React.useEffect(() => console.log("EFFECT"), []);

  if (type === InfoItemTypeState.CHANNEL) {
    return (
      <Box>
        <Header headerSubText={item.name} headerTitle="Details" />
        <ContentButtons name={item.name} />
        <Accordeons channel={item as IConversation} />
        <Files />
      </Box>
    );
  }
  if (type === InfoItemTypeState.PROFILE) {
    return (
      <Box>
        <Header headerTitle="Profile" />
        <ProfileInfo user={item as IUser} />
      </Box>
    );
  }

  return null;
};
