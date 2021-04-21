import { Box } from "@material-ui/core";
import React from "react";
import { Accordeons } from "./Accordions/Accordions";
import { Files } from "./Accordions/Files";
import { ContentButtons } from "./ContentButtons";
import Header from "./Header";

interface RightSideBlockProps {
  headerSubText?: string;
  type: string;
}

export const RightSideBlock: React.FC<RightSideBlockProps> = ({
  type,
  headerSubText
}) => {
  return (
    <Box>
      <Header />
      <ContentButtons />
      <Accordeons />
      <Files />
    </Box>
  );
};
