import React from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IUser } from "../store/modules/user/types";
import { conversationsApi } from "../services/api/converastionsApi";
import { AddPeopleFormPopover } from "./AddPeopleFormPopover";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";

export interface IAddPeopleModalForm {
  // inviteAll is just for control radio buttons
  // if inviteAll value is all then invite all company members
  // else value will be notAll and textfield for user search will be visible
  inviteAll: string;

  // search field is selected member from searching
  search?: string;
}

export interface IAddPeopleModalProps {
  conversationId: string;
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
  clearButton: {
    height: "100%",
  },
}));

export const AddPeopleModalForm: React.FC<IAddPeopleModalProps> = ({
  conversationId,
}: IAddPeopleModalProps) => {
  const classes = useStyles();

  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);

  const setUser = (user: IUser) => {
    setSelectedUser(user);
  };

  const {
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm();
  const onSubmit: SubmitHandler<IAddPeopleModalForm> = (data) =>
    conversationsApi.addUsers(conversationId, selectedUser?._id);

  const clearUser = () => {
    setSelectedUser(null);
    setValue("search", "");
  };

  const isName = watch("InviteAll") === "NotAll";
  const username = watch("search");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="InviteAll"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <RadioGroup
            aria-label="invite"
            name="invite"
            onChange={field.onChange}
          >
            <FormControlLabel
              value="All"
              control={<Radio />}
              onChange={clearUser}
              label="Add all members"
            />
            <FormControlLabel
              value="NotAll"
              control={<Radio />}
              label="Add specific member"
            />
          </RadioGroup>
        )}
      />
      {isName && (
        <Controller
          name="search"
          control={control}
          defaultValue={""}
          rules={{ required: true }}
          render={({ field }) => (
            <AddPeopleFormPopover
              isUserSelected={!!selectedUser}
              setUserFunction={setUser}
              username={username}
              opener={
                <Grid container wrap="nowrap">
                  <TextField
                    {...field}
                    className={classes.input}
                    InputProps={{
                      classes: {
                        focused: classes.inputFocused,
                      },
                    }}
                    fullWidth
                    value={(selectedUser && selectedUser.name) || field.value}
                    color="secondary"
                    size="small"
                    variant="outlined"
                    label="Type user name or email and press enter"
                  />
                  {selectedUser && (
                    <Button
                      type="reset"
                      className={classes.clearButton}
                      onClick={clearUser}
                    >
                      Clear
                    </Button>
                  )}
                </Grid>
              }
            />
          )}
        />
      )}
      <Button
        disabled={isName && !selectedUser}
        type="submit"
        className={classes.button}
        variant="contained"
        color="primary"
        fullWidth
      >
        Add
      </Button>
    </form>
  );
};
