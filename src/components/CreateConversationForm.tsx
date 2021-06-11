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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Typography } from "@material-ui/core";
import { addUserConversations } from "../store/modules/user/user";
import { useDispatch } from "react-redux";

export interface ICreateConversationFormProps {
  closeModalFunction: () => void;
}

export interface ICreateConversationForm {
  name: string;
  isPrivate: boolean;
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
    marginTop: theme.spacing(3),
  },
}));

export const CreateConversationForm: React.FC<ICreateConversationFormProps> = ({
  closeModalFunction,
}: ICreateConversationFormProps) => {
  const classes = useStyles();

  const history = useHistory();

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const onSubmit: SubmitHandler<ICreateConversationForm> = (data) => {
    conversationsApi
      .createChannel(data.name, data.isPrivate)
      .then((conversation) => {
        dispatch(addUserConversations([conversation._id]));
        history.push(`/${conversation._id}`);
        closeModalFunction();
      })
      .catch((err) => setOpen(true));
  };

  const name = watch("name");
  const isPrivate = watch("isPrivate");

  const togglePrivate = () => {
    setValue("isPrivate", !isPrivate);
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
            error={errors.name && errors.name.type === "required"}
            helperText={
              errors.name && errors.name.type === "required" && "Required"
            }
          />
        )}
      />
      <Controller
        name="isPrivate"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            onChange={togglePrivate}
            control={<Switch size="small" color="primary" />}
            label={
              <>
                <Typography variant="subtitle2">Make private</Typography>
                <Typography variant="caption">
                  When a channel is set to private, it can only joined by
                  invitation.
                </Typography>
              </>
            }
          />
        )}
      />
      <Button
        type="submit"
        disabled={!name}
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
