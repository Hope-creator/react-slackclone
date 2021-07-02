import { Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { GetStartedForm } from "../components/GetStartedForm";
import { LoginHeader } from "../components/LoginHeader";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    textAlign: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    fontWeight: 700,
    marginBottom: 20,
  },
  input: {
    margin: "0 0 20px",
  },
  signInForm: {
    maxWidth: "400px",
    marginTop: "40px",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      width: 200,
      marginTop: "20px",
    },
  },
  header: {
    [theme.breakpoints.down("sm")]: {
      width: 200,
      "& h3": {
        fontSize: "2rem",
      },
    },
  },
  inputFocused: {
    transition: theme.transitions.create(["border", "box-shadow"], {
      duration: "80ms",
    }),
    boxShadow: "0px 0px 0px 4px rgba(29,155,209, 0.3)",
  },
  radioCheckWrapper: {
    textAlign: "start",
  },
  formLegend: {
    fontSize: "0.9rem",
    color: "#1d1c1d",
    fontWeight: 700,
  },
  formTsAndCs: {
    textAlign: "start",
    margin: "20px 0 70px 0",
    color: "#696969",
    "&>a": {
      color: "#696969",
    },
  },
}));

export const GetStarted: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <LoginHeader newToSlackShow={false} title={"First, enter your email"} />
      </div>
      <div className={classes.signInForm}>
        <div className={classes.signInForm}>
          <GetStartedForm />
        </div>
        <Typography variant="body2" className={classes.formTsAndCs}>
          By continuing, you’re agreeing to our{" "}
          <Link>Customer Terms of Service</Link>, <Link>Privacy Policy</Link>,
          and <Link>Cookie Policy</Link>.
        </Typography>
      </div>
    </div>
  );
};
