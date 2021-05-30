import React from "react";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SendIcon from "@material-ui/icons/Send";
import {
  sendNewMessage,
  setSendNewMessageState,
} from "../store/modules/currentConversation/currentConversation";
import { UploadImages } from "./UploadImages";
import { ImagesBox } from "./ImagesBox";
import { uploadApi } from "../services/api/uploadApi";
import { selectSendNewMessageLoadingState } from "../store/modules/currentConversation/selectors";
import { LoadingSendMessageState } from "../store/modules/currentConversation/types";
import { CircularProgress } from "@material-ui/core";

export interface ISendMessageProps {
  conversationId: string;
}

export interface ISendMessageForm {
  text: string;
  conversationId: string;
  attachments?: string[];
}

export interface IImageFile {
  imageSrc: string;
  image: File;
}

const useStyles = makeStyles((theme) => ({
  box: {
    border: "1px solid black",
    borderRadius: 5,
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
  textareaSize: {
    resize: "none",
    border: "none",
    outline: "none",
    width: "99%",
    margin: 4,
    fontSize: 14,
    boxSizing: "border-box",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(29,28,29,.52)",
      borderRadius: "4px",
    },
  },
  circularProgress: {
    margin: 10,
  },
}));

export const SendMessageForm: React.FC<ISendMessageProps> = ({
  conversationId,
}: ISendMessageProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const sendMessageLoadingState = useSelector(selectSendNewMessageLoadingState);

  const { handleSubmit, control, watch, reset } = useForm();

  const [open, setOpen] = React.useState<boolean>(false);

  const [images, setImages] = React.useState<IImageFile[]>([]);

  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const isText = watch("text");

  const onSubmit: SubmitHandler<ISendMessageForm> = (data) => {
    if (images.length > 0) {
      // Manualy set send message state to LOADING
      // cause first is fileSend function that not in state
      dispatch(setSendNewMessageState(LoadingSendMessageState.LOADING));
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image.image);
      });
      formData.append("conversationId", conversationId);
      // First in call api to upload on Cloudinary
      uploadApi
        .uploadFile(formData)
        .then((files) => {
          // After cloudinary upload file and server save it to DB
          // it will return correct form files
          const messageData = {
            conversationId: conversationId,
            text: data.text,
            attachments: files,
          };
          dispatch(sendNewMessage(messageData));
        })
        .catch((err) => dispatch(setSendNewMessageState(LoadingSendMessageState.ERROR)));
    } else {
      const messageData = { conversationId: conversationId, text: data.text };
      dispatch(sendNewMessage(messageData));
    }
    reset({ text: "" });
    setImages([]);
  };

  const setImage = (image: IImageFile) => {
    setImages((prev) => [...prev, image]);
  };

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((image) => image.imageSrc !== url));
  };

  const handleBoxClick = () => {
    inputRef.current && inputRef.current.focus();
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

  React.useEffect(() => {
    if (sendMessageLoadingState === LoadingSendMessageState.ERROR) {
      setOpen(true);
    }
    if (sendMessageLoadingState === LoadingSendMessageState.ERROR) {
      setOpen(true);
    }
  }, [sendMessageLoadingState]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.box} onClick={handleBoxClick}>
        <Controller
          name="text"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              className={classes.textareaSize}
              rowsMax={5}
              ref={inputRef}
              placeholder="Send message"
            />
          )}
        />
        <ImagesBox images={images} removeImage={removeImage} />
        <Grid container justify="flex-end">
          {sendMessageLoadingState === LoadingSendMessageState.LOADING ? (
            <CircularProgress className={classes.circularProgress} size={20} />
          ) : (
            <>
              <UploadImages setImage={setImage} />
              <IconButton
                type="submit"
                disabled={images.length === 0 && !isText}
                color="primary"
                size="small"
              >
                <SendIcon />
              </IconButton>
            </>
          )}
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={"Oops... Something went wrong"}
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
      </Box>
    </form>
  );
};
