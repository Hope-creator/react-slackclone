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

export interface IMemberProps {
  member: IUser;
}

const useStyles = makeStyles({
  root: {
    width: 150,
    margin: 10,
  },
  media: {
    height: 200,
    backgroundSize: "contain",
  },
});

export const Member: React.FC<IMemberProps> = ({ member }: IMemberProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchCurrentInfoProfile(member._id));
  };

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={member.avatar || defaultAvatar}
          title={`Profile picture of ${member.name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {member.name}
          </Typography>
          {member.work && (
            <Typography variant="body2" color="textSecondary" component="p">
              {member.work}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
