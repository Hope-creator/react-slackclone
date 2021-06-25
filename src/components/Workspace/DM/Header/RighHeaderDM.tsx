import React from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentInfoProfile } from "../../../../store/modules/currentInfo_side/currentInfo";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { IUser } from "../../../../store/modules/user/types";

interface IRighHeaderDMProps {
  partner: IUser;
}

export const RighHeaderDM: React.FC<IRighHeaderDMProps> = ({
  partner,
}) => {
  const dispatch = useDispatch();

  const infoButtonHandleClick = () => {
    dispatch(fetchCurrentInfoProfile(partner._id));
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
