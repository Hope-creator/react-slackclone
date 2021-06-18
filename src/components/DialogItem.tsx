import React from "react";
import { IDialog } from "../store/modules/dialogs/types";
import { IUser } from "../store/modules/user/types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import defaultAvatar from "../images/defaultAvatar.png";
import Avatar from "@material-ui/core/Avatar";
import { getFormatedDate } from "../functions/getFormatedDate";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

interface IDialogItemProps {
  dialog: IDialog;
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContainer: {
      backgroundColor: "#f1f1f1",
      height: "100px",
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
      margin: "5px 20px",
    },
    message: {
      wordBreak: "break-all",
      overflow: "hidden",
      fontSize: 14,
      lineHeight: 1.2,
      height: 14 * 1.2 * 3,
    },
  })
);

export const DialogItem: React.FC<IDialogItemProps> = ({ dialog, user }) => {
  const classes = useStyles();

  const history = useHistory();

  const partner =
    dialog.creator._id !== user._id ? dialog.creator : dialog.partner;

  const handleClick = () => {
    history.push("/d/" + dialog._id);
  };

  return (
    <>
      <Typography variant="subtitle2" className={classes.dialogDate}>
        {getFormatedDate(new Date(dialog.updatedAt))}
      </Typography>
      <div onClick={handleClick} className={classes.dialogContainer}>
        <Grid container wrap="nowrap" className={classes.dialogWrapper}>
          <Grid item xs={1}>
            <Avatar
              className={classes.avatar}
              src={partner.avatar || defaultAvatar}
            />
          </Grid>
          <Grid item xs={11}>
            <Grid container justify="space-between" wrap="nowrap">
              <Typography variant="subtitle2">
                {partner.name}
                {partner._id === user._id && " (you)"}
              </Typography>
              {dialog.last_message && dialog.last_message._id && (
                <Typography variant="caption">
                  {format(new Date(dialog.last_message.createdAt), "h:mm aa")}
                </Typography>
              )}
            </Grid>
            {dialog.last_message && dialog.last_message._id && (
              <Typography className={classes.message}>
                {dialog.last_message.creator._id === user._id
                  ? "You: "
                  : `${dialog.last_message.creator.name}: `}
                {dialog.last_message.attachments &&
                dialog.last_message.attachments.length > 0
                  ? dialog.last_message.attachments[0].url
                  : dialog.last_message.text}
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};
