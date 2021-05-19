import React from "react";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { IConversation } from "../../store/modules/conversations/types";
import { useDispatch } from "react-redux";
import { fetchCurrentInfoChannel } from "../../store/modules/currentInfo/currentInfo";
import { MembersModal } from "../MembersModal";
import { IUser } from "../../store/modules/user/types";

interface IWorkspaceHeaderProps {
  conversation?: IConversation;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    workspaceHeader: {
      borderBottom: "1px solid rgb(233,227,230)",
      height: 64,
      padding: "0 16px",
    },
    headerStarButton: {
      fontSize: "1rem",
    },
    addTopicText: {
      cursor: "pointer",
      color: "#696969",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
    name: {
      wordBreak: "break-word",
      width: "500px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  })
);

export const WorkspaceHeader: React.FC<IWorkspaceHeaderProps> = ({
  conversation,
}: IWorkspaceHeaderProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const infoButtonHandleClick = () => {
    if (conversation) dispatch(fetchCurrentInfoChannel(conversation._id));
  };

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.workspaceHeader}
      wrap="nowrap"
    >
      <Grid item xs={10}>
        <Grid container direction="column">
          <Grid item container wrap="nowrap">
            {conversation && (
              <Link component="div" className={classes.name}>
                #{conversation.name}
              </Link>
            )}
            {conversation && (
              <Tooltip title="Star channel" aria-label="Star channel">
                <IconButton size="small">
                  <StarBorderIcon className={classes.headerStarButton} />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item>
            {conversation?.is_channel &&
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
      </Grid>
      <Grid item container xs={2} wrap="nowrap">
        {conversation && (
          <Tooltip
            title={`View all ${conversation.num_members} members`}
            aria-label={`View all ${conversation.num_members} members`}
          >
            <MembersModal
              name={conversation.name}
              users={conversation.members as IUser[]}
              opener={<IconButton>{conversation.num_members}</IconButton>}
            />
          </Tooltip>
        )}
        <Tooltip title={`Add people`} aria-label={`Add people`}>
          <IconButton size="small">
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Show conversation details"
          aria-label="Show conversation details"
        >
          <IconButton size="small" onClick={infoButtonHandleClick}>
            <ErrorOutlineIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
