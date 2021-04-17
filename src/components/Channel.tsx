import { ListItem, ListItemIcon } from "@material-ui/core";
import React from "react";
import TextureIcon from "@material-ui/icons/Texture";
import ListItemText from "@material-ui/core/ListItemText";

interface ChanneProps {
  name: string;
}

export const Channel: React.FC<ChanneProps> = ({
  name,
}: ChanneProps): React.ReactElement => {
  return (
    <ListItem dense button onClick={() => console.log("cluck")}>
      <ListItemIcon>
        <TextureIcon color="primary" />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ color: "primary" }}>
        {name}
      </ListItemText>
    </ListItem>
  );
};
