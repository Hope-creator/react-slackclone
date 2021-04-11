import {
  Button,
  FormControlLabel,
  FormLabel,
  Link,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { LoginFooter } from "../components/LoginFooter";
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
      color: "#696969"
    }
  },
}));

export const SignIn = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <LoginHeader newToSlackShow={false} title={"First, enter your email"} />
      <div className={classes.signInForm}>
        <TextField
          className={classes.input}
          InputProps={{
            classes: {
              focused: classes.inputFocused,
            },
          }}
          label="name@work-email.com"
          id="outlined-basic"
          color="secondary"
          size="small"
          variant="outlined"
          fullWidth
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          fullWidth
        >
          Continue
        </Button>
        <FormLabel className={classes.formLegend} component="legend">
          Can we send you email with Slack tips, news, and offers?
        </FormLabel>
        <RadioGroup
          aria-label="Can we send you email with Slack tips, news, and offers?"
          name="emailoffers"
        >
          <FormControlLabel
            value="Sure!"
            control={<Radio size="small" />}
            label="Sure!"
          />
          <FormControlLabel
            value="No thanks"
            control={<Radio size="small" />}
            label="No thanks"
          />
        </RadioGroup>
        <Typography variant="body2" className={classes.formTsAndCs}>
          By continuing, you’re agreeing to our{" "}
          <Link>Customer Terms of Service</Link>, <Link>Privacy Policy</Link>,
          and <Link>Cookie Policy</Link>.
        </Typography>
      </div>

      <LoginFooter />
    </div>
  );
};
