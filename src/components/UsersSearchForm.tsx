import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export interface IUsersSearchFormProps {
  formSubmit: (name: string) => void;
}

export interface IUsersSearchForm {
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

export const UsersSearchForm: React.FC<IUsersSearchFormProps> = ({
  formSubmit,
}) => {
  const classes = useStyles();

  const { handleSubmit, control } = useForm();
  const onSubmit: SubmitHandler<{ [x: string]: any; }> = (data) =>
    formSubmit(data.name);

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
            label="Search Users"
          />
        )}
      />
    </form>
  );
};
