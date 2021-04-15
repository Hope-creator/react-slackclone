import React from "react";
import Popover from "@material-ui/core/Popover";
import { MenuItem } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

interface SimplePopOverProps {
  text: string;
  children: React.ReactNode;
  anchorOriginBlockVertical: "top" | "center" | "bottom";
  anchorOriginBlockHorizontal: "left" | "center" | "right";
  anchorPopupBlockVertical: "top" | "center" | "bottom";
  anchorPopupBlockHorizontal: "left" | "center" | "right";
}

export const SimplePopover: React.FC<SimplePopOverProps> = ({
  text,
  children,
  anchorOriginBlockVertical,
  anchorOriginBlockHorizontal,
  anchorPopupBlockVertical,
  anchorPopupBlockHorizontal,
}: SimplePopOverProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLLIElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <MenuItem aria-describedby={id} onClick={handleClick}>
        {anchorOriginBlockHorizontal === "center" && (
          <ArrowBackIosIcon fontSize="small" />
        )}
        {text}
        {anchorOriginBlockHorizontal === "right" && (
          <ArrowForwardIosIcon fontSize="small" />
        )}
      </MenuItem>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: anchorOriginBlockVertical,
          horizontal: anchorOriginBlockHorizontal,
        }}
        transformOrigin={{
          vertical: anchorPopupBlockVertical,
          horizontal: anchorPopupBlockHorizontal,
        }}
      >
        {children}
      </Popover>
    </div>
  );
};
