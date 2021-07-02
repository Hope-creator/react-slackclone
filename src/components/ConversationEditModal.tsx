import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

interface IConversationEditModalProps {
  opener: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  handleCloseError: () => void;
  edit?: string;
  textHeader: string;
  textFooter: string;
  errorMessage?: string;
  saveHandle: (value: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      top: "50%",
      left: "50%",
      position: "absolute",
      borderRadius: 10,
      height: "auto",
      outline: "none",
      width: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      transform: `translate(-50%, -50%)`,
    },
    openerWrapper: {
      "&>p": {
        fontSize: 12,
        color: "grey",
        cursor: "pointer",
        width: "350px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    closeIcon: {
      fontSize: 18,
    },
    buttonsContainer: {
      marginTop: 30,
    },
    cancelButton: {
      marginRight: 10,
    },
    errorButton: {
      backgroundColor: "pink",
    },
  })
);

export const ConversationEditModal: React.FC<IConversationEditModalProps> = ({
  opener,
  errorMessage,
  saveHandle,
  edit,
  textHeader,
  textFooter,
  open,
  handleClose,
  handleCloseError,
  handleOpen,
}) => {
  const classes = useStyles();

  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    if (edit) {
      setValue(edit);
    } else {
      setValue("");
    }
  }, [edit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div onClick={handleOpen} className={classes.openerWrapper}>
        {opener}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <Grid alignItems="center" justify="space-between" container>
            <Grid item>
              <Typography variant="h5">{textHeader}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            onChange={handleChange}
            value={value}
            fullWidth
            multiline
            rows={5}
            error={value.length > 250}
            helperText={value.length > 250 && "Max length is 250 symbols"}
          />
          <Typography variant="caption">{textFooter}</Typography>
          <Grid
            className={classes.buttonsContainer}
            container
            justify="flex-end"
          >
            <Button
              className={classes.cancelButton}
              onClick={handleClose}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              className={!!errorMessage ? classes.errorButton : undefined}
              onClick={() => saveHandle(value)}
              variant="contained"
              color="secondary"
            >
              Save
            </Button>
          </Grid>
          <Snackbar
            open={!!errorMessage}
            autoHideDuration={6000}
            onClose={handleCloseError}
            message={errorMessage}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseError}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </div>
      </Modal>
    </div>
  );
};
