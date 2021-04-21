import React from "react";
import Popover from "@material-ui/core/Popover";
import { MenuItem } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";


interface SimplePopOverProps {
  itemChildren: React.ReactNode;
  children: React.ReactNode;
  anchorOriginBlockVertical: "top" | "center" | "bottom";
  anchorOriginBlockHorizontal: "left" | "center" | "right";
  anchorPopupBlockVertical: "top" | "center" | "bottom";
  anchorPopupBlockHorizontal: "left" | "center" | "right";
  arrow?: boolean;
}

export const SimplePopover: React.FC<SimplePopOverProps> = ({
  itemChildren,
  children,
  anchorOriginBlockVertical,
  anchorOriginBlockHorizontal,
  anchorPopupBlockVertical,
  anchorPopupBlockHorizontal,
  arrow = false
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
        {itemChildren}
        {arrow && (
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
