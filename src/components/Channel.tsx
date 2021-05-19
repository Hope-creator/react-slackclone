import { ListItem, ListItemIcon } from "@material-ui/core";
import React, { useCallback } from "react";
import LockIcon from "@material-ui/icons/Lock";
import ListItemText from "@material-ui/core/ListItemText";
import { IConversation } from "../store/modules/conversations/types";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

interface ChanneProps {
  channel: IConversation;
}

export const Channel: React.FC<ChanneProps> = ({
  channel,
}: ChanneProps): React.ReactElement => {
  const history = useHistory();
  const pushChannel = useCallback(
    (id) => {
      history.push(`/${id}`);
    },
    [history]
  );
  return (
    <ListItem dense button onClick={() => pushChannel(channel._id)}>
      {channel.is_private ? (
        <ListItemIcon>
          <LockIcon color="primary" />
        </ListItemIcon>
      ) : (
        <ListItemIcon>
          <Typography color="primary" variant="h6">
            &nbsp;&nbsp;#
          </Typography>
        </ListItemIcon>
      )}
      <ListItemText
        primaryTypographyProps={{
          color: "primary",
          style: {
            width: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
      >
        {channel.name}
      </ListItemText>
    </ListItem>
  );
};
