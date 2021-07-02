import React from "react";
import LanguageIcon from "@material-ui/icons/Language";
import { Grid, Link } from "@material-ui/core";

export const LoginFooter: React.FC = (): React.ReactElement => {
  return (
    <div style={{ width: 350 }}>
      <Grid container justify="space-between">
        <Link color="textPrimary">Privacy & Terms</Link>
        <Link color="textPrimary">Contact Us</Link>
        <Link color="textPrimary">
          <LanguageIcon style={{ fontSize: 16, marginRight: 5 }} />
          Change region
        </Link>
      </Grid>
    </div>
  );
};
