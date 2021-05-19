import React from "react";
import { Avatar, Button, Grid, ListItem, Typography } from "@material-ui/core";
import { IUser } from "../store/modules/user/types";
import defaultAvatar from "../images/defaultAvatar.png";
import { UserPopover } from "./UserPopover";

interface IUserListItemProps {
  user: IUser;
  isMe: boolean;
}

export const UserListItem: React.FC<IUserListItemProps> = ({ user, isMe }) => {
  return (
    <UserPopover
      anchorOriginBlockHorizontal="center"
      anchorOriginBlockVertical="center"
      anchorPopupBlockHorizontal="center"
      anchorPopupBlockVertical="center"
      opener={
        <ListItem button onClick={() => console.log("userlist")}>
          <Grid container justify="space-between">
            <Grid item container alignItems="center" xs={10}>
              <Avatar
                style={{ marginRight: 10 }}
                src={user.avatar || defaultAvatar}
              />
              <Typography>
                {user.name} {isMe && "(you)"}
              </Typography>
            </Grid>
            <Grid item>
              <Button>Remove</Button>
            </Grid>
          </Grid>
        </ListItem>
      }
      user={user}
    />
  );
};
