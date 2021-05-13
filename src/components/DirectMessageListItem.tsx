import { Avatar, ListItem, ListItemAvatar } from "@material-ui/core";
import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import defaultAvatar from "../images/defaultAvatar.png";
import { IUser } from "../store/modules/user/types";
import { IConversation } from "../store/modules/conversations/types";
import { useSelector } from "react-redux";
import { selectUser } from "../store/modules/user/selectors";
import { useHistory } from "react-router-dom";
import { userApi } from "../services/api/userApi";
import CircularProgress from "@material-ui/core/CircularProgress";

interface DirectMessageListItemProps {
  conversation: IConversation;
}

export const DirectMessageListItem: React.FC<DirectMessageListItemProps> = ({
  conversation,
}: DirectMessageListItemProps): React.ReactElement => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const me = useSelector(selectUser);

  const history = useHistory();

  React.useEffect(() => {
    if (me) {
      const notMe = conversation.members.filter((id) => id !== me._id)[0];
      userApi
        .getUser(notMe)
        .then((user) => setUser(user))
        .catch((err) => <div>Error</div>);
    }
  }, [me]);

  if (!user) return <CircularProgress />;

  return (
    <ListItem dense button onClick={() => history.push(`/${conversation._id}`)}>
      <ListItemAvatar>
        <Avatar
          alt={`user_avatar_+${user.name}`}
          src={user.avatar || defaultAvatar}
        />
      </ListItemAvatar>
      <ListItemText primaryTypographyProps={{ color: "primary" }}>
        {conversation.name}
      </ListItemText>
    </ListItem>
  );
};
