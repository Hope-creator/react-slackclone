import React from "react";
import { IUser } from "../store/modules/user/types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { getFormatedDate } from "../functions/getFormatedDate";
import { useHistory } from "react-router-dom";
import { AvatarWithBadge } from "./AvatarWithBadge";

interface IDialogItemProps {
  partner: IUser;
  me: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContainer: {
      backgroundColor: "#f1f1f1",
      height: "75px",
      margin: "5px 20px",
      borderRadius: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f8f8f8",
      },
    },
    dialogWrapper: {
      padding: "20px",
    },
    avatar: {
      height: "36px",
      width: "36px",
    },
    dialogDate: {
      height: 25,
      margin: "5px 20px",
    },
  })
);

export const DialogItem: React.FC<IDialogItemProps> = ({ partner, me }) => {
  const classes = useStyles();

  const history = useHistory();

  const handleClick = () => {
    history.push("/d/" + partner._id);
  };

  return (
    <>
      <Typography variant="subtitle2" className={classes.dialogDate}>
        {getFormatedDate(new Date(partner.createdAt))}
      </Typography>
      <div onClick={handleClick} className={classes.dialogContainer}>
        <Grid
          alignItems="center"
          justify="space-between"
          container
          className={classes.dialogWrapper}
        >
          <Grid item>
            <AvatarWithBadge user={partner} className={classes.avatar} />
          </Grid>
          <Grid item>
            <Grid container justify="space-between" wrap="nowrap">
              <Typography variant="subtitle2">
                {partner.name}
                {partner._id === me._id && " (you)"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
