import React from "react";

import { Pathes } from "../constants";

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
      case Pathes.SAVED_PAGE:
        return <BookmarkBorderIcon />;
      case Pathes.ALLDIALOGS:
        return <QuestionAnswerOutlinedIcon />;
      case Pathes.UNREADS:
        return <SubjectOutlinedIcon />;
      case Pathes.BROWSE_CHANNELS:
        return <PageviewOutlinedIcon />;
      case Pathes.MEMBERS:
        return <PermContactCalendarOutlinedIcon />;

      default:
        return null;
    }
  };
