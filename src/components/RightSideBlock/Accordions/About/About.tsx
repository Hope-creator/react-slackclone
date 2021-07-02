import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";
import { IConversation } from "../../../../store/modules/conversations/types";
import { IUser } from "../../../../store/modules/user/types";
import { AboutUser } from "./AboutUser";
import { AboutChannel } from "./AboutChannel";

interface AboutProps {
  user?: IUser;
  channel?: IConversation;
}

export const About: React.FC<AboutProps> = ({ user, channel }) => {
  return (
    <Accordion square>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body1">About</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {user ? (
          <AboutUser user={user} />
        ) : channel ? (
          <AboutChannel channel={channel} />
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
};
