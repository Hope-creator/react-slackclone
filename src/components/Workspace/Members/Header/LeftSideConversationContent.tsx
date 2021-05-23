import React from "react";
import { IConversation } from "../../../../store/modules/conversations/types";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

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
  ({ conversation }: ILeftSideConversationContentProps) => {
    const classes = useStyles();

    return (
      <Grid container direction="column">
        <Grid item container wrap="nowrap">
          <Link component="div" className={classes.name}>
            #{conversation.name}
          </Link>
        </Grid>
        <Grid item>
          {conversation.is_channel &&
            (conversation.topic || (
              <Typography
                variant="body2"
                className={classes.addTopicText}
                onClick={() => console.log("type")}
              >
                Add a topic
              </Typography>
            ))}
        </Grid>
      </Grid>
    );
  };
