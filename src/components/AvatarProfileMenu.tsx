import React from "react";

import { EditProfileModal } from "./EditProfileModal";

import Paper from "@material-ui/core/Paper/Paper";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { IUser } from "../store/modules/user/types";
import { AvatarWithBadge } from "./AvatarWithBadge";
import { useDispatch } from "react-redux";
import { logoutUser, updateIsAway } from "../store/modules/user/user";
import { fetchInfoSideProfile } from "../store/modules/infoSide/infoSide";

interface IAvatarProfileMenuProps {
  me: IUser;
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
    name: {
      width: "250px",
      whiteSpace: "nowrap",
      margin: "0 auto",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);

export const AvatarProfileMenu: React.FC<IAvatarProfileMenuProps> = ({
  me,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSetAwayClick = () => {
    dispatch(updateIsAway(!me.away));
  };

  const handleViewProfileClick = () => {
    dispatch(fetchInfoSideProfile(me._id));
  };

  const handleSignOutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <Paper className={classes.submenuContainer}>
      <Box className={classes.avatarMenuHeader}>
        <AvatarWithBadge user={me} />
        <Typography className={classes.name} variant="subtitle2">{me.name}</Typography>
        <Typography variant="caption">{me.away ? "Away" : "Active"}</Typography>
      </Box>
      <Divider />
      <MenuItem button onClick={handleSetAwayClick}>
        <Typography variant="body1">
          Set yourself as {me.away ? <b>online</b> : <b>away</b>}
        </Typography>
      </MenuItem>
      <Divider />
      <EditProfileModal
        me={me}
        opener={
          <MenuItem>
            <Typography variant="body1">Edit profile</Typography>
          </MenuItem>
        }
      />
      <MenuItem button onClick={handleViewProfileClick}>
        <Typography variant="body1">View profile</Typography>
      </MenuItem>
      <Divider />
      <MenuItem button onClick={handleSignOutClick}>
        <Typography variant="body1">Sign out of Test company</Typography>
      </MenuItem>
    </Paper>
  );
};
