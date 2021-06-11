import React from "react";

import { pathes } from "../constants";

import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import PageviewOutlinedIcon from "@material-ui/icons/PageviewOutlined";
import PermContactCalendarOutlinedIcon from "@material-ui/icons/PermContactCalendarOutlined";

interface ISideBarListItemIconCreatorProps {
  path: string;
}

export const SideBarListItemIconCreator: React.FC<ISideBarListItemIconCreatorProps> =
  ({ path }) => {
    switch (path) {
      case pathes.SAVED_PAGE:
        return <BookmarkBorderIcon />;
      case pathes.ALLDMS:
        return <QuestionAnswerOutlinedIcon />;
      case pathes.UNREADS:
        return <SubjectOutlinedIcon />;
      case pathes.BROWSE_CHANNELS:
        return <PageviewOutlinedIcon />;
      case pathes.MEMBERS:
        return <PermContactCalendarOutlinedIcon />;

      default:
        return null;
    }
  };
