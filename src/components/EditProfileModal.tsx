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
} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Link from "@material-ui/core/Link";

interface SimpleModalProps {
  opener: React.ReactNode;
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
  })
);

export const EditProfileModal: React.FC<SimpleModalProps> = ({ opener }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const children = () => (
    <Paper className={classes.paper}>
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
          <FormControl fullWidth>
            <Input
              placeholder="Full name"
              id="fullname"
              aria-describedby="fullname"
            />
          </FormControl>
          <InputLabel className={classes.label} htmlFor="displayname">
            <Typography variant="h6">Display name</Typography>
          </InputLabel>
          <FormControl fullWidth>
            <Input
              placeholder="Display name"
              id="displayname"
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">
              This could be your first name, or a nickname — however you’d like
              people to refer to you.
            </FormHelperText>
          </FormControl>
          <InputLabel className={classes.label} htmlFor="whatido">
            <Typography variant="h6">What i do</Typography>
          </InputLabel>
          <FormControl fullWidth>
            <Input
              placeholder="What I do"
              id="whatido"
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">
              Let people know what you do at Test company.
            </FormHelperText>
          </FormControl>
          <InputLabel className={classes.label} htmlFor="phone">
            <Typography variant="h6">Phone number</Typography>
          </InputLabel>
          <FormControl fullWidth>
            <Input
              placeholder="(123) 555-5555"
              id="phone"
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">
              Enter a phone number
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid className={classes.photoBlockWrapper} item>
          <Typography variant="h6">Profile photo</Typography>
          <Avatar
            style={{ height: "192px", width: "192px", borderRadius: "4px" }}
            variant="square"
            src="https://images.unsplash.com/photo-1513483460609-1c8a505ea990?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
          />
          <Button variant="outlined" fullWidth>
            <Typography variant="h6">Upload an Image</Typography>
          </Button>
          <Link>Remove photo</Link>
        </Grid>
      </Grid>
      <Divider />
      <Grid className={classes.buttonsWrapper} container justify="flex-end">
        <Button
          className={classes.cancelButton}
          onClick={handleClose}
          variant="outlined"
        >
          <Typography variant="h6">Cancel</Typography>
        </Button>
        <Button variant="contained">
          <Typography variant="h6">Save changes</Typography>
        </Button>
      </Grid>
    </Paper>
  );

  return (
    <div>
      <div onClick={handleOpen}>{opener}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {children()}
      </Modal>
    </div>
  );
};
