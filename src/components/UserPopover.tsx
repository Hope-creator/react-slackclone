import React from "react";
import Popover from "@material-ui/core/Popover";
import { IUser } from "../store/modules/user/types";
import { UserPopoverContent } from "./UserPopoverContent";

interface UserPopoverProps {
  anchorOriginBlockVertical: "top" | "center" | "bottom";
  anchorOriginBlockHorizontal: "left" | "center" | "right";
  anchorPopupBlockVertical: "top" | "center" | "bottom";
  anchorPopupBlockHorizontal: "left" | "center" | "right";
  opener: React.ReactNode;
  user: IUser;
}

export const UserPopover: React.FC<UserPopoverProps> = ({
  anchorOriginBlockVertical,
  anchorOriginBlockHorizontal,
  anchorPopupBlockVertical,
  anchorPopupBlockHorizontal,
  opener,
  user,
}: UserPopoverProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
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
        <UserPopoverContent user={user} />
      </Popover>
    </div>
  );
};
