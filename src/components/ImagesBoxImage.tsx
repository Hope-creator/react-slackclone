import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import CancelIcon from "@material-ui/icons/Cancel";

interface IImagesBoxImageProps {
  url: string;
  removeImage: (url: string) => void;
}

const useStyles = makeStyles(() => ({
  divImage: {
    width: 60,
    height: 60,
    border: "1px solid #e6e6e6",
    borderRadius: 5,
    margin: "0 5px",
    backgroundColor: "rgba(28,28,28,.04)",
    backgroundSize: "cover",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    bottom: 47,
    left: 47,
    padding: 0,
    "&:hover": {
      background: "none",
      color: "black",
    },
  },
}));

export const ImagesBoxImage: React.FC<IImagesBoxImageProps> = ({
  url,
  removeImage,
}) => {
  const classes = useStyles();

  const [isCloseVisible, setIsCloseVisible] = React.useState<boolean>(false);

  return (
    <div
      className={classes.divImage}
      style={{
        backgroundImage: `url(${url})`,
      }}
      onMouseEnter={() => setIsCloseVisible(true)}
      onMouseLeave={() => setIsCloseVisible(false)}
    >
      {isCloseVisible && (
        <Tooltip title="Remove file">
          <IconButton
            onClick={() => removeImage(url)}
            className={classes.closeIcon}
          >
            <CancelIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};
