import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import PageviewOutlinedIcon from "@material-ui/icons/PageviewOutlined";
import PermContactCalendarOutlinedIcon from "@material-ui/icons/PermContactCalendarOutlined";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import { ListItemIcon } from "@material-ui/core";

interface SidebarListCreatorProps {
  componentName: string;
}

export const SidebarListCreator: React.FC<SidebarListCreatorProps> = ({
  componentName,
}: SidebarListCreatorProps): React.ReactElement | null => {
  switch (componentName) {
    case "Mentions & reactions":
      return (
        <ListItem dense button onClick={() => console.log("cluck")}>
          <ListItemIcon>
            <AlternateEmailIcon color="primary" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: "primary" }}>
            Mentions & reactions
          </ListItemText>
        </ListItem>
      );
    case "Saved items":
      return (
        <ListItem dense button onClick={() => console.log("cluck")}>
          <ListItemIcon>
            <BookmarkBorderIcon color="primary" />
          </ListItemIcon>

          <ListItemText primaryTypographyProps={{ color: "primary" }}>
            Saved items
          </ListItemText>
        </ListItem>
      );
    case "All DMs":
      return (
        <ListItem dense button onClick={() => console.log("cluck")}>
          <ListItemIcon>
            <QuestionAnswerOutlinedIcon color="primary" />
          </ListItemIcon>

          <ListItemText primaryTypographyProps={{ color: "primary" }}>
            All DMs
          </ListItemText>
        </ListItem>
      );
    case "All unreads":
      return (
        <ListItem dense button onClick={() => console.log("cluck")}>
          <ListItemIcon>
            <SubjectOutlinedIcon color="primary" />
          </ListItemIcon>

          <ListItemText primaryTypographyProps={{ color: "primary" }}>
            All unreads
          </ListItemText>
        </ListItem>
      );
    case "Channel browser":
      return (
        <ListItem dense button onClick={() => console.log("cluck")}>
          <ListItemIcon>
            <PageviewOutlinedIcon color="primary" />
          </ListItemIcon>

          <ListItemText primaryTypographyProps={{ color: "primary" }}>
            Channel browser
          </ListItemText>
        </ListItem>
      );
    case "People & user groups":
      return (
        <ListItem dense button onClick={() => console.log("cluck")}>
          <ListItemIcon>
            <PermContactCalendarOutlinedIcon color="primary" />
          </ListItemIcon>

          <ListItemText primaryTypographyProps={{ color: "primary" }}>
            People & user groups
          </ListItemText>
        </ListItem>
      );

    default:
      return null;
  }
};
