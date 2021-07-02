import React from "react";
import { Link, makeStyles, Typography } from "@material-ui/core";
import FlareIcon from "@material-ui/icons/Flare";
import { LoginHeader } from "../components/LoginHeader";
import { SignInForm } from "../components/SignInForm";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    textAlign: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  dividerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  divider: {
    width: "44%",
    margin: "10px",
  },
  signInTitle: {
    fontWeight: 700,
  },
  signInText: {
    marginBottom: 32,
  },

  signInForm: {
    maxWidth: "400px",
    marginTop: "40px",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      width: 200,
    },
  },
  emailPrompt: {
    textAlign: "left",
    display: "flex",
    backgroundColor: "rgba(29,28,29,.05)",
    padding: "12px 24px",
    marginTop: "20px",
    borderRadius: "8px",
  },
  emailPromptIcon: {
    fontSize: "15px",
    paddingRight: "10px",
  },
  button: {
    fontWeight: 700,
  },
  signInFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footerLink: {
    marginRight: "16px",
    color: "#696969",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  newToSlackWrapper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
  header: {
    [theme.breakpoints.down("sm")]: {
      width: 200,
      "& h3": {
        fontSize: "2rem",
      },
    },
  },
}));

export const SignIn = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <LoginHeader newToSlackShow={true} title={"Sign in to Slack"} />
      </div>
      <div className={classes.signInForm}>
        <SignInForm />
        <div className={classes.emailPrompt}>
          <FlareIcon className={classes.emailPromptIcon} />
          <Typography variant="subtitle2">
            We’ll email you a magic code for a password-free sign in. Or you can{" "}
            <Link color="secondary">sign in manually instead.</Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};
