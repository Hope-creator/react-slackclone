import React from "react";
import { IConversation } from "../../../../store/modules/conversations/types";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import { ConvTopicEditModal } from "../../../ConvTopicEditModal";

interface ILeftSideConversationContentProps {
  conversation: IConversation;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addTopicText: {
      cursor: "pointer",
      color: "#696969",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
    name: {
      display: "block",
      wordBreak: "break-word",
      width: "500px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);

export const LeftSideConversationContent: React.FC<ILeftSideConversationContentProps> =
  ({ conversation }) => {
    const classes = useStyles();
    return (
      <Grid container direction="column">
        <Grid item container wrap="nowrap">
          <Typography
            variant="subtitle2"
            color="initial"
            className={classes.name}
          >
            {conversation.is_private ? (
              <>
                <LockIcon fontSize="small" />
                {conversation.name}
              </>
            ) : (
              "#" + conversation.name
            )}
          </Typography>
        </Grid>
        <Grid item>
          <ConvTopicEditModal
            conversation={conversation}
            opener={
              <Typography>{conversation.topic || "Add a topic"}</Typography>
            }
          />
        </Grid>
      </Grid>
    );
  };
