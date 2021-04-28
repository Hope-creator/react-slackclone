import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ICompany } from "../store/modules/company/types";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Typography from "@material-ui/core/Typography/Typography";
import { SimplePopover } from "./SimplePopover";
import Divider from "@material-ui/core/Divider/Divider";
import Paper from "@material-ui/core/Paper/Paper";

import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

interface ICompanyMenuItemProps {
  company: ICompany;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItemTeam: {
      padding: "20px 24px",
    },
    menuTeamIcon: {
      fontSize: "3rem",
    },
    submenuContainer: {
      width: 300,
      padding: "17px 0",
      backgroundColor: "rgba(248,248,248,1)",
    },
    captionText: {
      paddingLeft: "16px",
    },
  })
);

export const CompanyMenuContent: React.FC<ICompanyMenuItemProps> = ({
  company,
}): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Grid
        wrap="nowrap"
        alignItems="center"
        className={classes.menuItemTeam}
        container
      >
        <DeveloperBoardIcon className={classes.menuTeamIcon} />
        <Typography variant="subtitle1" noWrap>
          {company.name}
          <Typography variant="body2" noWrap>
            {company.name}
          </Typography>
        </Typography>
      </Grid>
      <Divider />
      <MenuItem>
        <Typography variant="body1">Invite people to {company.name}</Typography>
      </MenuItem>
      <MenuItem>
        <Typography variant="body1">Create a channel</Typography>
      </MenuItem>
      <Divider />
      <SimplePopover
        opener={
          <MenuItem aria-describedby="Administation">
            <Typography variant="body1">Administration</Typography>
            <ArrowForwardIosIcon fontSize="small" />
          </MenuItem>
        }
        anchorOriginBlockVertical="center"
        anchorOriginBlockHorizontal="right"
        anchorPopupBlockVertical="center"
        anchorPopupBlockHorizontal="center"
      >
        <Paper className={classes.submenuContainer}>
          <Typography className={classes.captionText} variant="caption">
            Administration
          </Typography>
          <MenuItem>
            <Typography variant="body1">Manage members</Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="body1">Manage apps</Typography>
          </MenuItem>
        </Paper>
      </SimplePopover>
      <MenuItem>
        <Typography variant="body1">Sign out of {company.name}</Typography>
      </MenuItem>
    </>
  );
};
