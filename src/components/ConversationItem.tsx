import React from "react";
import { IConversation } from "../store/modules/conversations/types";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import { IUser } from "../store/modules/user/types";
import DoneIcon from "@material-ui/icons/Done";

interface IConversationItemProps {
  conversation: IConversation;
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 20,
      borderTop: "1px solid #DDDDDD",
      borderCollapse: "collapse",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#e6e6e6",
      },
      "&:last-child": {
        borderBottom: "1px solid #DDDDDD",
      },
    },
    joinedText: {
      color: "green",
    },
  })
);

export const ConversationItem: React.FC<IConversationItemProps> = ({
  conversation,
  user,
}) => {
  const classes = useStyles();

  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const isMember = user.conversations.includes(conversation._id);

  const setIsHoveredTrue = () => {
    setIsHovered(true);
  };

  const setIsHoveredFalse = () => {
    setIsHovered(false);
  };

  return (
    <Grid
      onMouseEnter={setIsHoveredTrue}
      onMouseLeave={setIsHoveredFalse}
      className={classes.container}
      container
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item>
        <Typography variant="subtitle2">#{conversation.name}</Typography>
        <Grid container wrap="nowrap" alignItems="center">
          {isMember && (
            <>
              <Typography variant="caption" className={classes.joinedText}>
                <DoneIcon fontSize="small" /> Joined
              </Typography>
              &nbsp;&nbsp;·&nbsp;&nbsp;
            </>
          )}
          <Typography variant="caption">
            {conversation.num_members} members
          </Typography>
        </Grid>
      </Grid>
      {isHovered && (
        <Grid item>
          {isMember ? <Button color="inherit" variant="outlined">Leave</Button> : <Button color="primary" variant="contained">Join</Button>}
        </Grid>
      )}
    </Grid>
  );
};
