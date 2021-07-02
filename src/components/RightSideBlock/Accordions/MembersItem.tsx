import React from "react";
import { IUser } from "../../../store/modules/user/types";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { UserPopover } from "../../UserPopover";
import { AvatarWithBadge } from "../../AvatarWithBadge";

interface IMembersItemProps {
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    smallAvatar: {
      width: "20px !important",
      height: "20px !important",
      marginRight: theme.spacing(1),
    },
    itemContainer: {
      height: 35,
      minHeight: 0,
    },
  })
);

export const MembersItem: React.FC<IMembersItemProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <UserPopover
      opener={
        <MenuItem
          className={classes.itemContainer}
          aria-describedby="Administation"
        >
          <AvatarWithBadge
            user={user}
            className={classes.smallAvatar}
            sizes="width: 20px; height: 20px"
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
  );
};
