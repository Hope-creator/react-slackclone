import React from "react";
import { Link, Grid, Typography } from "@material-ui/core";

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
          <Link variant="caption" color="secondary">
            Create an account
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
