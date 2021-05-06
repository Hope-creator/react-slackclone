import React from "react";
import { Link, Grid, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

interface LoginHeaderProps {
  newToSlackShow: boolean;
  title: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  newToSlackShow,
  title,
}: LoginHeaderProps): React.ReactElement => {
  return (
    <Grid container direction="column">
      {newToSlackShow && (
        <Grid container alignItems="flex-end" direction="column">
          <Typography variant="caption">New to Slack?</Typography>
          <Link component="div" variant="caption" color="secondary">
            <NavLink to="/get-started">Create an account</NavLink>
          </Link>
        </Grid>
      )}
      <Typography variant="h3">{title}</Typography>
      <Typography>
        We suggest using the <strong>email address you use at work.</strong>
      </Typography>
    </Grid>
  );
};
