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
import { useSelector } from "react-redux";
import { selectUser } from "../../store/modules/user/selectors";
import { useHistory } from "react-router-dom";
import { EditProfileModal } from "../EditProfileModal";

interface IProfileInfoProps {
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileName: {
      textAlign: "center",
    },
    profileField: {
      padding: "8px 16px",
    },
    button: {
      width: "100%"
    },
    avatar: {
      height: "218px",
      width: "218px",
      borderRadius: "4px",
      margin: "16px auto",
      [theme.breakpoints.down("sm")]: {
        height: "128px",
      width: "128px",
      },
    }
  })
);

export const ProfileInfo: React.FC<IProfileInfoProps> = ({ user }) => {
  const classes = useStyles();

  const me = useSelector(selectUser);

  const history = useHistory();

  const isMe = me && me._id === user._id;

  const handleStartDialogButtonClick = () => {
    history.push(`/d/${user._id}`);
  };

  return (
    <Box>
      <Avatar
        className={classes.avatar}
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
          {isMe ? (<EditProfileModal opener={
          <IconButton className={classes.button}>
              <CreateIcon />
              Edit profile
            </IconButton>
          } me={user} />)
             : (
            <IconButton className={classes.button} onClick={handleStartDialogButtonClick}>
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
