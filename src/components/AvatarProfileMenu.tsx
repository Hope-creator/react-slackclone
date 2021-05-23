import React from "react";

import { StyledBadge } from "./StyledBadge";
import { EditProfileModal } from "./EditProfileModal";

import Paper from "@material-ui/core/Paper/Paper";
import Box from "@material-ui/core/Box/Box";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { IUser } from "../store/modules/user/types";

interface IAvatarProfileMenuProps {
  user: IUser;
}

const useStyles = makeStyles(() =>
  createStyles({
    submenuContainer: {
      width: 300,
      padding: "17px 0",
      backgroundColor: "rgba(248,248,248,1)",
    },
    avatarMenuHeader: {
      textAlign: "center",
    },
  })
);

export const AvatarProfileMenu: React.FC<IAvatarProfileMenuProps> = ({
  user,
}) => {
  const classes = useStyles();

  /*const handleViewProfileClick = () => {

  };*/

  return (
    <Paper className={classes.submenuContainer}>
      <Box className={classes.avatarMenuHeader}>
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar src={user.avatar} />
        </StyledBadge>
        <Typography variant="subtitle2">{user.name}</Typography>
        <Typography variant="caption">Active</Typography>
      </Box>
      <Divider />
      <MenuItem>
        <Typography variant="body1">
          Set yourself as <b>away</b>
        </Typography>
      </MenuItem>
      <Divider />
      <EditProfileModal
        opener={
          <MenuItem>
            <Typography variant="body1">Edit profile</Typography>
          </MenuItem>
        }
      />
      <MenuItem button >
        <Typography variant="body1">View profile</Typography>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Typography variant="body1">Sign out of Test company</Typography>
      </MenuItem>
    </Paper>
  );
};
