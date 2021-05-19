import React from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { createUser } from "../store/modules/user/user";
import { selectUserLoadingState } from "../store/modules/user/selectors";
import { LoadingUserState } from "../store/modules/user/types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export interface IGetStartedForm {
  name: string;
  email: string;
  password: string;
  password2: string;
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

export const GetStartedForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userLoadingState = useSelector(selectUserLoadingState);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit: SubmitHandler<IGetStartedForm> = (data) =>
    dispatch(createUser(data));

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
    if (userLoadingState === LoadingUserState.ERROR) {
      setOpen(true);
    }
  }, [userLoadingState]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
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
            fullWidth
            color="secondary"
            size="small"
            variant="outlined"
            label="Your name"
            error={errors.name && errors.name.type === "required"}
            helperText={
              errors.name && errors.name.type === "required" && "Required"
            }
          />
        )}
      />
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
            label="Your email"
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
      <Controller
        name="password2"
        control={control}
        defaultValue={""}
        rules={{
          required: true,
          validate: (value) =>
            value === watch("password") || "Passwords don't match.",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            className={classes.input}
            InputProps={{
              classes: {
                focused: classes.inputFocused,
              },
            }}
            label="Confirm password"
            id="outlined-basic"
            color="secondary"
            size="small"
            variant="outlined"
            type="password"
            fullWidth
            error={
              (errors.password2 && errors.password2.type === "required") ||
              (errors.password2 && errors.password2.type === "validate")
            }
            helperText={
              (errors.password2 &&
                errors.password2.type === "required" &&
                "Required") ||
              (errors.password2 &&
                errors.password2.type === "validate" &&
                "Passwords don't match.")
            }
          />
        )}
      />
      <Button
        type="submit"
        className={classes.button}
        variant="contained"
        color="primary"
        fullWidth
      >
        Sign up
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Something got wrong"
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
