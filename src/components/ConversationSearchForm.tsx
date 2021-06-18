import React from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import {
  clearCurrentConversationsState,
  fetchCurrentConversations,
} from "../store/modules/currentConversations/currentConversations";
import CancelIcon from "@material-ui/icons/Cancel";

export interface IConversationSearchForm {
  name: string;
}

const useStyles = makeStyles((theme) => ({
  input: {
    margin: "0 0 20px",
    border: "none"
  },

  button: {
    fontWeight: 700,
  },
  clearText: {
    cursor: "pointer",
  },
  clearButton: {
    padding: 0,
    "&:hover": {
      background: "none",
    },
  },
}));

export const ConversationSearchForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { handleSubmit, control, watch, reset } = useForm();
  const onSubmit: SubmitHandler<IConversationSearchForm> = (data) => {
    if (data.name) dispatch(fetchCurrentConversations(data.name));
    else {
      dispatch(clearCurrentConversationsState());
    }
  };

  const handleClear = () => {
    dispatch(clearCurrentConversationsState());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextField
            {...field}
            className={classes.input}
            InputProps={{
              endAdornment: watch("name") && (
                <InputAdornment position="end">
                  <Tooltip title="Clear" placement="top">
                    <IconButton
                      onClick={handleClear}
                      className={classes.clearButton}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            fullWidth
            color="secondary"
            size="small"
            variant="outlined"
            label={
              watch("name") ? "Press enter to search" : "Seach by channel name"
            }
          />
        )}
      />
    </form>
  );
};
