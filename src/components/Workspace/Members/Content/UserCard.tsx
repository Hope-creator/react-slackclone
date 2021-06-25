import React from "react";

import { useDispatch } from "react-redux";
import defaultAvatar from "../../../../images/defaultAvatar.png";
import { IUser } from "../../../../store/modules/user/types";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { fetchCurrentInfoProfile } from "../../../../store/modules/currentInfo_side/currentInfo";

export interface IUserCardProps {
  user: IUser;
}

const useStyles = makeStyles({
  root: {
    height: 250,
    width: 150,
    margin: 10,
  },
  media: {
    height: 200,
    backgroundSize: "contain",
  },
});

export const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchCurrentInfoProfile(user._id));
  };

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={user.avatar || defaultAvatar}
          title={`Profile picture of ${user.name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {user.name}
          </Typography>
          {user.work && (
            <Typography variant="body2" color="textSecondary" component="p">
              {user.work}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
