import React from "react";
import { IUser } from "../../../store/modules/user/types";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import defaultAvatar from "../../../images/defaultAvatar.png";
import { UserPopover } from "../../UserPopover";

interface IMembersItemProps {
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  })
);

export const MembersItem: React.FC<IMembersItemProps> = ({
  user,
}: IMembersItemProps) => {
  const classes = useStyles();

  return (
    <>
      <UserPopover
        opener={
          <MenuItem aria-describedby="Administation">
            <Avatar
              className={classes.smallAvatar}
              src={user.avatar || defaultAvatar}
            />
            {user.display_name ? user.display_name : user.name}
          </MenuItem>
        }
        anchorOriginBlockVertical="center"
        anchorOriginBlockHorizontal="left"
        anchorPopupBlockVertical="center"
        anchorPopupBlockHorizontal="right"
        user={user}
      />
    </>
  );
};
