import { Typography } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Grid from "@material-ui/core/Grid";
import { IFile } from "../../services/api/uploadApi";

export interface IMessageFilesBoxProps {
  files: IFile[];
}

const useStyles = makeStyles({
  text: {
    color: "rgba(28,28,28,.7)",
  },
  iconButton: {
    padding: 0,
    "&:hover": {
      background: "none",
    },
  },
  image: {
    width: 112,
    height: 112,
    objectFit: "cover",
    border: "1px solid #e6e6e6",
    borderRadius: 5,
    margin: "5px 5px 0 0",
  },
});

export const MessageFilesBox: React.FC<IMessageFilesBoxProps> = ({ files }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Grid container alignItems="center">
        <Typography variant="caption" className={classes.text}>
          {files.length} files
        </Typography>
        {open ? (
          <IconButton className={classes.iconButton} onClick={handleClick}>
            <ArrowDropDownIcon />
          </IconButton>
        ) : (
          <IconButton className={classes.iconButton} onClick={handleClick}>
            <ArrowRightIcon />
          </IconButton>
        )}
      </Grid>
      <Collapse timeout={0} in={open}>
        <Grid container>
          {files.map((file) => (
            <img
              key={file.url}
              className={classes.image}
              src={file.url}
              alt="123"
            />
          ))}
        </Grid>
      </Collapse>
    </>
  );
};
