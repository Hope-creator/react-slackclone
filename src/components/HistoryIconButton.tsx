import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

import Tooltip from "@material-ui/core/Tooltip";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  getLocalHistoryItems,
  LocalHistoryItem,
} from "../functions/getLocalHistoryItems";
import { IUser } from "../store/modules/user/types";
import { HistoryItemFactory } from "../functions/HistoryItemFactory";
import { historyItemKeyFactory } from "../functions/historyItemKeyFactory";

export interface IHistoryIconButtonProps {
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      color: "rgb(210,210,210)",
      padding: "0",
    },
    contentContainer: {
      width: 360,
      minHeight: 200,
    },
    contentHeader: {
      backgroundColor: "rgba(248,248,248, 1)",
      padding: "12px 21px",
    },
    recentText: {
      color: "rgba(28,28,28, .5)",
    },
  })
);

export const HistoryIconButton: React.FC<IHistoryIconButtonProps> = ({
  user,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [currentHistoryItems, setCurrentHistoryItems] = React.useState<
    LocalHistoryItem[]
  >([]);

  React.useEffect(() => {
    const items = getLocalHistoryItems();
    setCurrentHistoryItems(items);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    const items = getLocalHistoryItems();
    setCurrentHistoryItems(items);
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-company-popover" : undefined;

  return (
    <>
      <Tooltip title="History" aria-label="History">
        <IconButton
          onClick={handleClick}
          className={classes.iconButton}
          aria-label="History"
        >
          <AccessTimeIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className={classes.contentContainer}>
          <div className={classes.contentHeader}>
            <Typography className={classes.recentText} variant="body2">
              Recent
            </Typography>
          </div>
          <div>
            {currentHistoryItems.length > 0 &&
              currentHistoryItems.map((item) => (
                <HistoryItemFactory
                  me={user}
                  onClick={handleClose}
                  item={item}
                  key={historyItemKeyFactory(item)}
                />
              ))}
          </div>
        </div>
      </Popover>
    </>
  );
};
