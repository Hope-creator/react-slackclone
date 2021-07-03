import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import { IUser, LoadingUserState } from "../store/modules/user/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  removeAvatar,
  updateAvatar,
  updateProfile,
} from "../store/modules/user/user";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../images/defaultAvatar.png";
import { selectUserLoadingState } from "../store/modules/user/selectors";

export interface IEditProfileForm {
  name: string;
  display_name?: string;
  work?: string;
  phone?: number;
}

export interface SimpleModalProps {
  opener: React.ReactNode;
  me: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      top: "50%",
      left: "50%",
      position: "absolute",
      height: "auto",
      outline: "none",
      width: 700,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      transform: `translate(-50%, -50%)`,
      [theme.breakpoints.down("sm")]: {
        width: 350,
      },
      [theme.breakpoints.down("xs")]: {
        width: 250,
      },
    },
    label: {
      cursor: "pointer",
      marginTop: theme.spacing(3),
    },
    formBlockWrapper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    photoBlockWrapper: {
      width: "192px",
      marginTop: "20px",
      textAlign: "center",
      "&>*": {
        marginBottom: theme.spacing(2),
      },
    },
    cancelButton: {
      marginRight: theme.spacing(2),
    },
    buttonsWrapper: {
      marginTop: theme.spacing(3),
    },
    removePhotoButton: {
      backgroundColor: "#ff5959b0",
      "&:hover": {
        backgroundColor: "red",
      },
    },
    errorButton: {
      backgroundColor: "red",
    },
    avatar: {
      height: "192px",
      width: "192px",
      borderRadius: "4px",
      [theme.breakpoints.down("sm")]: {
        height: "92px",
        width: "92px",
      },
    },
  })
);

export const EditProfileModal: React.FC<SimpleModalProps> = ({
  opener,
  me,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const inputFile = React.useRef<HTMLInputElement>(null);

  const profileUpdateLoading = useSelector(selectUserLoadingState);

  const [open, setOpen] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit: SubmitHandler<IEditProfileForm> = (data) =>
    dispatch(updateProfile(data));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleUploadImage = () => {
    // `current` points to the mounted file input element
    inputFile && inputFile.current && inputFile.current.click();
  };

  const handleRemoveAvatar = () => {
    if (me.avatar) dispatch(removeAvatar());
  };

  const uploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    else {
      const formData = new FormData();
      formData.append("avatar", event.target.files[0]);
      dispatch(updateAvatar(formData));
    }
  };

  return (
    <div>
      <div onClick={handleOpen}>{opener}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">Edit your profile</Typography>
            <Grid
              wrap="nowrap"
              className={classes.formBlockWrapper}
              justify="space-between"
              container
            >
              <Grid item>
                <InputLabel className={classes.label} htmlFor="fullname">
                  <Typography variant="h6">Full name</Typography>
                </InputLabel>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={me.name}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <TextField
                        {...field}
                        placeholder="Full name"
                        id="fullname"
                        aria-describedby="fullname"
                        error={errors.name && errors.name.type === "required"}
                        helperText={
                          errors.name &&
                          errors.name.type === "required" &&
                          "Name cannot be empty"
                        }
                      />
                    </FormControl>
                  )}
                />
                <InputLabel className={classes.label} htmlFor="displayname">
                  <Typography variant="h6">Display name</Typography>
                </InputLabel>
                <Controller
                  name="display_name"
                  control={control}
                  defaultValue={me.display_name}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Input
                        {...field}
                        placeholder="Display name"
                        id="displayname"
                        aria-describedby="my-helper-text"
                      />
                      <FormHelperText id="my-helper-text">
                        This could be your first name, or a nickname — however
                        you’d like people to refer to you.
                      </FormHelperText>
                    </FormControl>
                  )}
                />

                <InputLabel className={classes.label} htmlFor="work">
                  <Typography variant="h6">What i do</Typography>
                </InputLabel>
                <Controller
                  name="work"
                  control={control}
                  defaultValue={me.work}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Input
                        {...field}
                        placeholder="What I do"
                        id="work"
                        aria-describedby="my-helper-text"
                      />
                      <FormHelperText id="my-helper-text">
                        Let people know what you do at Test company.
                      </FormHelperText>
                    </FormControl>
                  )}
                />

                <InputLabel className={classes.label} htmlFor="phone">
                  <Typography variant="h6">Phone number</Typography>
                </InputLabel>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={me.phone}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Input
                        {...field}
                        onChange={(e) => {
                          if (isNaN(+e.target.value)) field.onChange("");
                          else {
                            field.onChange(+e.target.value);
                          }
                        }}
                        placeholder="(123) 555-5555"
                        id="phone"
                        aria-describedby="my-helper-text"
                      />
                      <FormHelperText id="my-helper-text">
                        Enter a phone number
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid className={classes.photoBlockWrapper} item>
                <Typography variant="h6">Profile photo</Typography>
                <Avatar
                  className={classes.avatar}
                  variant="square"
                  src={me.avatar || defaultAvatar}
                />
                <input
                  onChange={uploadAvatar}
                  ref={inputFile}
                  style={{ display: "none" }}
                  id="avatar"
                  type="file"
                ></input>
                <Button
                  className={
                    profileUpdateLoading === LoadingUserState.ERRORUPDATE
                      ? classes.errorButton
                      : undefined
                  }
                  disabled={
                    profileUpdateLoading === LoadingUserState.LOADINGUPDATE
                  }
                  startIcon={
                    profileUpdateLoading === LoadingUserState.LOADINGUPDATE && (
                      <CircularProgress color="secondary" size={14} />
                    )
                  }
                  onClick={handleUploadImage}
                  variant="outlined"
                  fullWidth
                >
                  <Typography variant="h6">Upload an Image</Typography>
                </Button>
                <Button
                  disabled={
                    profileUpdateLoading === LoadingUserState.LOADINGUPDATE
                  }
                  startIcon={
                    profileUpdateLoading === LoadingUserState.LOADINGUPDATE && (
                      <CircularProgress color="secondary" size={14} />
                    )
                  }
                  className={
                    profileUpdateLoading === LoadingUserState.ERRORUPDATE
                      ? classes.errorButton
                      : classes.removePhotoButton
                  }
                  onClick={handleRemoveAvatar}
                  variant="outlined"
                  fullWidth
                >
                  <Typography variant="h6">Remove photo</Typography>
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              className={classes.buttonsWrapper}
              container
              justify="flex-end"
            >
              <Button
                className={classes.cancelButton}
                onClick={handleClose}
                variant="outlined"
              >
                <Typography variant="h6">Cancel</Typography>
              </Button>
              <Button
                disabled={
                  profileUpdateLoading === LoadingUserState.LOADINGUPDATE
                }
                startIcon={
                  profileUpdateLoading === LoadingUserState.LOADINGUPDATE && (
                    <CircularProgress color="secondary" size={14} />
                  )
                }
                className={
                  profileUpdateLoading === LoadingUserState.ERRORUPDATE
                    ? classes.errorButton
                    : undefined
                }
                color="primary"
                type="submit"
                variant="contained"
              >
                <Typography color="inherit" variant="h6">
                  Save changes
                </Typography>
              </Button>
            </Grid>
          </form>
        </Paper>
      </Modal>
    </div>
  );
};
