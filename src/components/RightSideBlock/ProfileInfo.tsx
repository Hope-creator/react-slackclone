import React from "react";
import defaultAvatar from "../../images/defaultAvatar.png";

import { Avatar, Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import { IUser } from "../../store/modules/user/types";

interface IProfileInfoProps {
  user: IUser;
  handleClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileName: {
      textAlign: "center"
    },
    profileField: {
      padding: "8px 16px"
    }
  })
);

export const ProfileInfo: React.FC<IProfileInfoProps> = ({
  user,
  handleClick,
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Avatar
        style={{
          height: "256px",
          width: "256px",
          borderRadius: "4px",
          margin: "16px auto",
        }}
        src={user.avatar ? user.avatar : defaultAvatar}
        alt={`profile_${user.name}_image_${user.avatar}`}
      />
      <Box>
        <Box className={classes.profileName}>
          <Typography variant="h6" color="textPrimary">
            {user.name}
          </Typography>
          {user.work ? (
            <Typography>{user.work}</Typography>
          ) : user.work ? (
            <Link>Add a title</Link>
          ) : null}
          {user.is_admin ? (
            <IconButton>
              <CreateIcon />
              Edit profile
            </IconButton>
          ) : (
            <IconButton>
              <CommentOutlinedIcon />
              Message
            </IconButton>
          )}
        </Box>
        <Box>
          {user.display_name ? (
            <Box className={classes.profileField}>
              <Typography variant="caption">Display name</Typography>
              <Typography>{user.display_name}</Typography>
            </Box>
          ) : null}
          {user.phone ? (
            <Box className={classes.profileField}>
              <Typography variant="caption">Phone number</Typography>
              <Typography>{user.phone}</Typography>
            </Box>
          ) : null}
          <Box className={classes.profileField}>
            <Typography variant="caption">Email address</Typography>
            <Typography>{user.email}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
