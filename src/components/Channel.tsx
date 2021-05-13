import { ListItem, ListItemIcon } from "@material-ui/core";
import React, { useCallback } from "react";
import TextureIcon from "@material-ui/icons/Texture";
import ListItemText from "@material-ui/core/ListItemText";
import { IConversation } from "../store/modules/conversations/types";
import { useHistory } from "react-router-dom";

interface ChanneProps {
  channel: IConversation;
}

export const Channel: React.FC<ChanneProps> = ({
  channel,
}: ChanneProps): React.ReactElement => {

  const history = useHistory();
  const pushChannel = useCallback((id)=> {
    history.push(`/${id}`)
  } , [history])
  return (
    <ListItem dense button onClick={()=> pushChannel(channel._id)}>
      <ListItemIcon>
        <TextureIcon color="primary" />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ color: "primary" }}>
        {channel.name}
      </ListItemText>
    </ListItem>
  );
};
