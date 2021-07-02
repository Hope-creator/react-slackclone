import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid/Grid";
import { MembersItem } from "./MembersItem";
import { IConversation } from "../../../store/modules/conversations/types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSideInfoMembers,
  selectSideInfoMembersLoadingState,
} from "../../../store/modules/SideInfoMembers/selectors";
import { LoadingSideInfoMembersState } from "../../../store/modules/SideInfoMembers/types";
import { CircularProgress } from "@material-ui/core";
import { fetchSideInfoMembers } from "../../../store/modules/SideInfoMembers/SideInfoMembers";
import { FixedSizeList as List } from "react-window";
import { IUser } from "../../../store/modules/user/types";

interface IMembersProps {
  channel: IConversation;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidht: {
      width: "100%",
    },
  })
);

export const Members: React.FC<IMembersProps> = ({ channel }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const members = useSelector(selectSideInfoMembers);
  const membersLoadingState = useSelector(selectSideInfoMembersLoadingState);

  React.useEffect(() => {
    dispatch(fetchSideInfoMembers(channel._id));
  }, [channel, dispatch]);

  const itemKey = React.useCallback((index: number, data: IUser[]) => {
    const user = data[index];
    return user._id;
  }, []);

  return (
    <Accordion square>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container justify="space-between">
          <Typography variant="body1">Members</Typography>
          <Typography variant="body1">{members.length}</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid className={classes.fullWidht} direction="column">
          {membersLoadingState === LoadingSideInfoMembersState.LOADING ? (
            <CircularProgress />
          ) : (
            <List
              height={200}
              itemCount={members.length}
              itemData={members}
              itemSize={35}
              width="inherit"
              itemKey={itemKey}
            >
              {({ index, style }) => {
                const user = members[index];
                return (
                  <div style={style}>
                    <MembersItem user={user} />
                  </div>
                );
              }}
            </List>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
