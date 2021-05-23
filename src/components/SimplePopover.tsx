import React from "react";
import Popover from "@material-ui/core/Popover";

interface SimplePopOverProps {
  children: React.ReactNode;
  anchorOriginBlockVertical: "top" | "center" | "bottom";
  anchorOriginBlockHorizontal: "left" | "center" | "right";
  anchorPopupBlockVertical: "top" | "center" | "bottom";
  anchorPopupBlockHorizontal: "left" | "center" | "right";
  opener: React.ReactNode;
  isOpen?: boolean;
}

export const SimplePopover: React.FC<SimplePopOverProps> = ({
  children,
  anchorOriginBlockVertical,
  anchorOriginBlockHorizontal,
  anchorPopupBlockVertical,
  anchorPopupBlockHorizontal,
  opener,
  isOpen
}: SimplePopOverProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = isOpen || Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div onClick={handleClick} style={{cursor: "pointer"}}>
        {opener}
      </div>
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
