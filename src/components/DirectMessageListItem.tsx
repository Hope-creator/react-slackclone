import { Avatar, ListItem, ListItemAvatar } from "@material-ui/core";
import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import defaultAvatar from "../images/defaultAvatar.png";

interface DirectMessageListItemProps {
  name: string;
  avatarSrc?: string;
}

export const DirectMessageListItem: React.FC<DirectMessageListItemProps> = ({
  name,
  avatarSrc = defaultAvatar,
}: DirectMessageListItemProps): React.ReactElement => {
  return (
    <ListItem dense button onClick={() => console.log("cluck")}>
      <ListItemAvatar>
        <Avatar alt={`user_avatar_+${name}`} src={avatarSrc} />
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ color: "primary" }}>
        {name}
      </ListItemText>
    </ListItem>
  );
};
