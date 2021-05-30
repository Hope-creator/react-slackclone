import React from "react";
import { IImageFile } from "./SendMessageForm";

import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

interface IUploadImagesProps {
  setImage: (image: IImageFile) => void;
}

export const UploadImages: React.FC<IUploadImagesProps> = ({ setImage }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClickIcon = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
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

  const handleChangeInput = React.useCallback(
    (event: Event) => {
      if (event.target) {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (files) {
          Array.from(files).forEach((file) => {
            if (!file.type.match("image")) {
              setOpen(true);
              return;
            }
            const fileObj = new Blob([file]);
            setImage({ imageSrc: URL.createObjectURL(fileObj), image: file });
          });

          target.value = "";
        }
      }
    },
    [setImage]
  );

  React.useEffect(() => {
    const current = inputRef.current;
    if (current) {
      current.addEventListener("change", handleChangeInput);
    }
    return () => {
      if (current) {
        current.removeEventListener("change", handleChangeInput);
      }
    };
  }, [setImage, handleChangeInput]);

  return (
    <div>
      <Tooltip title="Attach image" aria-label="Attach image">
        <IconButton onClick={handleClickIcon}>
          <ImageOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={"Wrong type of file. Only images accepted"}
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

      <input
        ref={inputRef}
        accept="image/*"
        type="file"
        multiple
        id="upload-input"
        hidden
      />
    </div>
  );
};
