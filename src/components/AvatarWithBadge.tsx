import { Avatar } from "@material-ui/core";
import React from "react";
import { IUser } from "../store/modules/user/types";
import defaultAvatar from "../images/defaultAvatar.png";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";

interface IAvatarWithBadgeProps {
  user: IUser;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    badgeAway: {
      backgroundColor: "#ffeb30",
      color: "#ffeb30",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
    badgeOffline: {
      backgroundColor: "#e7e7e7",
      color: "#e7e7e7",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: "1px solid currentColor",
        content: '""',
      },
    },
  })
);

export const AvatarWithBadge: React.FC<IAvatarWithBadgeProps> = ({
  user,
  className,
  style,
  sizes,
}) => {
  const classes = useStyles();

  return (
    <Badge
      classes={{
        badge: !user.online
          ? classes.badgeOffline
          : user.away
          ? classes.badgeAway
          : classes.badge,
      }}
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
    >
      <Avatar
        className={className}
        alt={`profile_picture_${user._id}`}
        src={user.avatar || defaultAvatar}
        style={style}
        sizes={sizes}
      />
    </Badge>
  );
};
