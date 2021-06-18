import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchState, setSearch } from "../store/modules/search/search";
import { selectSearch } from "../store/modules/search/selectors";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  submenuIcon: {
    fontSize: "1rem",
    paddingRight: "10px",
  },
  paper: {
    width: 300,
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    padding: "10px",
  },
  searchIcon: {
    marginLeft: "16px",
    fontSize: "20px",
  },
  formContainer: {
    padding: "5px",
  },
});

export const SearchCompanyForm = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const val = useSelector(selectSearch);

  const ref = React.useRef<HTMLInputElement | null>(null);

  const handleChange = React.useCallback(() => {
    if (ref.current) dispatch(setSearch(ref.current.value));
  }, [dispatch]);

  const handleClear = React.useCallback(() => {
    dispatch(clearSearchState());
  }, [dispatch]);

  return (
    <Grid
      container
      className={classes.formContainer}
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item>
        <SearchIcon className={classes.searchIcon} />
      </Grid>
      <Grid item xs={11}>
        <input
          ref={ref}
          onChange={handleChange}
          value={val}
          className={classes.input}
          placeholder="Search for people, channels and aside"
        />
      </Grid>
      <Grid item>
        <Button onClick={handleClear}>Clear</Button>
      </Grid>
    </Grid>
  );
};
