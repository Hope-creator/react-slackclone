import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ICompany } from "../../store/modules/user/types";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";

import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import { CreateConversationModal } from "../CreateConversationlModal";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/modules/user/user";

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
}) => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const membersHandleClick = () => {
    history.push("/members");
  };

  const signOutHandleClick = () => {
    dispatch(logoutUser());
  };

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
      <CreateConversationModal
        opener={
          <MenuItem>
            <Typography variant="body1">Create a channel</Typography>
          </MenuItem>
        }
      />
      <Divider />
      <MenuItem button onClick={membersHandleClick}>
        <Typography variant="body1">Members</Typography>
      </MenuItem>
      <MenuItem button onClick={signOutHandleClick}>
        <Typography variant="body1">Sign out of {company.name}</Typography>
      </MenuItem>
    </>
  );
};
