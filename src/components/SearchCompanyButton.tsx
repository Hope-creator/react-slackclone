import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { SearchCompanyForm } from "./SearchCompanyForm";
import { SearchCompanyContent } from "./SearchCompanyContent";

import {
  selectSearch,
  selectSearchLoadingState,
} from "../store/modules/search/selectors";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../store/modules/user/types";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import { LoadingSearchState } from "../store/modules/search/types";
import { clearSearchState } from "../store/modules/search/search";

interface ISearchCompanyButtonProps {
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: "rgb(210,210,210)",
      justifyContent: "start",
      backgroundColor: "rgb(87,37,88)",
      boxShadow: "inset 0 0 0 1px rgb(119 80 120)",
      height: 24,
      margin: "0 10px",
      width: "60%",
      "&:hover": {
        backgroundColor: "rgb(92,44,93)",
        boxShadow: "inset 0 0 0 1px rgb(165 138 165)",
      },
    },
    contentContainer: {
      width: "750px",
      height: "250px",
      overflowY: "auto",
      overflowX: "hidden",
      maxHeight: "100%",
      "&::-webkit-scrollbar": {
        width: "0.5em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#A493A7",
        borderRadius: "4px",
      },
    },
    styledBottomBlock: {
      margin: "auto 0",
      width: "100%",
      backgroundColor: "rgba(248,248,248, 1)",
      height: "40px",
      textAlign: "end",
    },
    closeIcon: {
      padding: "0",
      height: "100%",
      width: "40px",
    },
    searchBlock: {
      width: "100%",
      textAlign: "start",
    },
    searchBlockIcon: {
      color: "rgb(210,210,210)",
      fontSize: 20,
      padding: 0,
    },
  })
);

export const SearchCompanyButton: React.FC<ISearchCompanyButtonProps> = ({
  user,
}) => {
  const classes = useStyles();

  const search = useSelector(selectSearch);

  const searchLoadingState = useSelector(selectSearchLoadingState);

  const dispatch = useDispatch();

  const handleClearSearchState = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      dispatch(clearSearchState());
    },
    [dispatch]
  );

  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-company-popover" : undefined;

  return (
    <>
      <Button
        className={classes.button}
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <div className={classes.searchBlock}>Search: {search}</div>
        {searchLoadingState === LoadingSearchState.NEVER ? (
          <SearchIcon className={classes.searchBlockIcon} />
        ) : (
          <IconButton
            className={classes.searchBlockIcon}
            onClick={handleClearSearchState}
          >
            <CancelIcon className={classes.searchBlockIcon} />
          </IconButton>
        )}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <>
          <div className={classes.contentContainer}>
            <SearchCompanyForm />
            <Divider />
            <div onClick={handleClose}>
              <SearchCompanyContent me={user} />
            </div>
          </div>
          <div className={classes.styledBottomBlock}>
            <IconButton onClick={handleClose} className={classes.closeIcon}>
              <CancelIcon />
            </IconButton>
          </div>
        </>
      </Popover>
    </>
  );
};
