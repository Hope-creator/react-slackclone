import { Box } from "@material-ui/core";
import React from "react";
import { IUser } from "../../store/modules/user/types";
import { Accordeons } from "./Accordions/Accordions";
import { Files } from "./Accordions/Files";
import { ContentButtons } from "./ContentButtons";
import Header from "./Header";
import ProfileInfo from "./ProfileInfo";

interface RightSideBlockProps {
  headerSubText?: string;
  type: string;
  content: IUser;
}

export const RightSideBlock: React.FC<RightSideBlockProps> = ({
  type,
  headerSubText,
  content,
}) => {
  if (type === "channel") {
    return (
      <Box>
        <Header headerTitle="Details" />
        <ContentButtons />
        <Accordeons />
        <Files />
      </Box>
    );
  }
  if (type === "profile") {
    return (
      <Box>
        <Header headerTitle="Profile" />
        <ProfileInfo
          user={content}
        />
      </Box>
    );
  }

  return null;
};
