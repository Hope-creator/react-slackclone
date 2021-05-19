import React from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { conversationsApi } from "../services/api/converastionsApi";
import { useHistory } from "react-router";

export interface ICreateConversationForm {
  name: string;
}

const useStyles = makeStyles((theme) => ({
  input: {
    margin: "0 0 10px",
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

export const CreateConversationForm = () => {
  const classes = useStyles();

  const history = useHistory();

  const [open, setOpen] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<ICreateConversationForm> = (data) => {
    conversationsApi
      .createChannel(data.name)
      .then((conversation) => history.push(`/${conversation._id}`))
      .catch((err) => setOpen(true));
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
            error={errors.email && errors.email.type === "required"}
            helperText={
              errors.email && errors.email.type === "required" && "Required"
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
        Create conversation
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Name is already taken by other channel"
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
