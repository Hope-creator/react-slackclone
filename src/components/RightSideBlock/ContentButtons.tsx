import React from "react";

import { Grid, IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { AddPeopleModal } from "../AddPeopleModal";
import { IConversation } from "../../store/modules/conversations/types";
import { ConvNameEditModal } from "../ConvNameEditModal";

interface IContentButtonsProps {
  channel: IConversation;
}

const useStyles = makeStyles(() =>
  createStyles({
    buttonsWrapper: {
      padding: "18px 0",
      borderBottom: "1px solid rgb(233,227,230)",
    },
    leaveButton: {
      color: "#e01e5a",
      "&:hover": {
        backgroundColor: "#ff6a9824",
      },
    },
  })
);

export const ContentButtons: React.FC<IContentButtonsProps> = ({
  channel,
}: IContentButtonsProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.buttonsWrapper}
      wrap="wrap"
      justify="space-around"
      alignItems="center"
    >
      <AddPeopleModal
        conversation={channel}
        opener={
          <IconButton>
            <PersonAddOutlinedIcon />
            Add
          </IconButton>
        }
      />
      <ConvNameEditModal
        conversation={channel}
        opener={
          <IconButton>
            <CreateOutlinedIcon />
            Rename
          </IconButton>
        }
      />
      <IconButton className={classes.leaveButton}>
        <ExitToAppOutlinedIcon />
        Leave
      </IconButton>
    </Grid>
  );
};
