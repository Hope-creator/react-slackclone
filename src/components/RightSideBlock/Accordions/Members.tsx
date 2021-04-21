import React from "react";

import defaultAvatar from "../../../images/defaultAvatar.png";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SimplePopover } from "../../SimplePopover";
import Grid from "@material-ui/core/Grid/Grid";
import { Avatar } from "@material-ui/core";

interface User {
  name: string;
  displayName?: string;
  localTime?: Date;
  phoneNumber?: number;
  email?: string;
  avatar?: string;
}

interface MembersProps {
  users?: User[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidht: {
      width: "100%",
    },
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  })
);

export const Members: React.FC<MembersProps> = ({ users = [] }) => {

  const classes = useStyles();

  const members = users.map((user) => (
    <>
      <SimplePopover
        itemChildren={
          <>
            <Avatar className={classes.smallAvatar} src={user.avatar} />
            {user.displayName ? user.displayName : user.name}
          </>
        }
        anchorOriginBlockVertical="center"
        anchorOriginBlockHorizontal="left"
        anchorPopupBlockVertical="center"
        anchorPopupBlockHorizontal="center"
      >
        123
      </SimplePopover>
    </>
  ));

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
          {members}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
