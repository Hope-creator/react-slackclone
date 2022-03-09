import React from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { fetchUser } from "../store/modules/user/user";
import { selectUserLoadingState } from "../store/modules/user/selectors";
import { LoadingUserState } from "../store/modules/user/types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

export interface ILoginForm {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  input: {
    margin: "0 0 20px",
  },
  inputFocused: {
    transition: theme.transitions.create(["border", "box-shadow"], {
      duration: "80ms",
    }),
    boxShadow: "0px 0px 0px 4px rgba(29,155,209, 0.3)",
  },
  button: {
    fontWeight: 700,
  },
}));

export const SignInForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userLoadingState = useSelector(selectUserLoadingState);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<{ [x: string]: any; }> = (data) =>
    dispatch(fetchUser(data as ILoginForm));

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (userLoadingState === LoadingUserState.ERRORLOGIN) {
      setOpen(true);
    }
  }, [userLoadingState]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue={""}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            className={classes.input}
            InputProps={{
              classes: {
                focused: classes.inputFocused,
              },
            }}
            type="email"
            fullWidth
            color="secondary"
            size="small"
            variant="outlined"
            id="email-outlined-basic"
            label="name@work-email.com"
            error={errors.email && errors.email.type === "required"}
            helperText={
              errors.email && errors.email.type === "required" && "Required"
            }
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue={""}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            className={classes.input}
            InputProps={{
              classes: {
                focused: classes.inputFocused,
              },
            }}
            label="Your password"
            id="outlined-basic"
            color="secondary"
            size="small"
            variant="outlined"
            type="password"
            fullWidth
            error={errors.password && errors.password.type === "required"}
            helperText={
              errors.password &&
              errors.password.type === "required" &&
              "Required"
            }
          />
        )}
      />
      {userLoadingState === LoadingUserState.LOADINGLOGIN ? (
        <CircularProgress size={24} />
      ) : (
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          fullWidth
        >
          Sign in with Email
        </Button>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Wrong email or password"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </form>
  );
};
