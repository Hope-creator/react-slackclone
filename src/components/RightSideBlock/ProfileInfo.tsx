import React from "react";
import defaultAvatar from "../../images/defaulAvatar.png";

import { Avatar, Box } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";

interface IProfileInfoProps {
  avatarSrc: string;
  name: string;
  title?: string;
  displayName?: string;
  phone?: number;
  email: string;
  self: boolean;
  handleClick?: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    headerContainer: {
      width: "100%",
      height: "64px",
      borderBottom: "1px solid rgb(233,227,230)",
      padding: "0 16px",
    },
    headerTitle: {
      fontWeight: 700,
    },
  })
);

export const ProfileInfo: React.FC<IProfileInfoProps> = ({
  avatarSrc = defaultAvatar,
  name,
  title,
  displayName,
  phone,
  email,
  self,
  handleClick,
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Header headerTitle="Profile" />
      <Avatar src={avatarSrc} alt={`profile_${name}_image_${avatarSrc}`} />
      <Box>
        <Typography variant="h5">{name}</Typography>
        {title ? (
          <Typography>{title}</Typography>
        ) : self ? (
          <Link>Add a title</Link>
        ) : null}
        {self ? (
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
        <Box>
          {displayName ? (
            <Box>
              <Typography variant="subtitle1">Display name</Typography>
              <Typography>{displayName}</Typography>
            </Box>
          ) : null}
          {phone ? (
            <Box>
              <Typography variant="subtitle1">Display name</Typography>
              <Typography>{phone}</Typography>
            </Box>
          ) : null}
          <Box>
            <Typography variant="subtitle1">Email address</Typography>
            <Typography>{email}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
