import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoadingUserState } from "../store/modules/user/types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export interface IGetStartedForm {
  name: string;
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

export const MembersSearchForm = () => {
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<IGetStartedForm> = (data) => console.log(data);

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
              classes: {
                focused: classes.inputFocused,
              },
            }}
            fullWidth
            color="secondary"
            size="small"
            variant="outlined"
            label="Search members"
          />
        )}
      />
    </form>
  );
};
