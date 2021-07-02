import React from "react";
import { useDispatch } from "react-redux";
import { fetchInfoSideProfile } from "../../../../store/modules/infoSide/infoSide";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { IUser } from "../../../../store/modules/user/types";

interface IHeaderRightDialogProps {
  partner: IUser;
}

export const HeaderRightDialog: React.FC<IHeaderRightDialogProps> = ({
  partner,
}) => {
  const dispatch = useDispatch();

  const infoButtonHandleClick = () => {
    dispatch(fetchInfoSideProfile(partner._id));
  };

  return (
    <>
      <Tooltip title="Show profile details" aria-label="Show profile details">
        <IconButton size="small" onClick={infoButtonHandleClick}>
          <ErrorOutlineIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
