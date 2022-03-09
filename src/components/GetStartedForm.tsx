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
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const onSubmit: SubmitHandler<{ [x: string]: any; }> = (data) =>
    dispatch(createUser(data as IGetStartedForm));

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
    if (userLoadingState === LoadingUserState.ERROREMAIL) {
      setOpen(true);
    }
  }, [userLoadingState]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue={""}
        rules={{ required: true, minLength: 2, maxLength: 40 }}
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
            id="name-outlined-basic"
            label="Your name"
            error={
              (errors.name && errors.name.type === "required") ||
              (errors.name && errors.name.type === "maxLength") ||
              (errors.name && errors.name.type === "minLength")
            }
            helperText={
              (errors.name && errors.name.type === "required" && "Required") ||
              (errors.name &&
                errors.name.type === "maxLength" &&
                "Max name length is 40 characters") ||
              (errors.name &&
                errors.name.type === "minLength" &&
                "Min name length is 2 characters")
            }
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue={""}
        rules={{ required: true, maxLength: 100 }}
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
            id="email-outlined-basic"
            size="small"
            variant="outlined"
            label="Your email"
            error={
              (errors.email && errors.email.type === "required") ||
              (errors.email && errors.email.type === "maxLength")
            }
            helperText={
              (errors.email &&
                errors.email.type === "required" &&
                "Required") ||
              (errors.email &&
                errors.email.type === "maxLength" &&
                "Max email length is 100 characters")
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
            id="pass-outlined-basic"
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
            id="pass-c-outlined-basic"
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
      {userLoadingState === LoadingUserState.LOADINGCREATE ? (
        <CircularProgress size={20} />
      ) : (
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          fullWidth
        >
          Sign up
        </Button>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          userLoadingState === LoadingUserState.ERROREMAIL
            ? "Email is already taken"
            : "Something got wrong"
        }
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
