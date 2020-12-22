import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Paper, Typography } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: fade(theme.palette.common.white, 0.5),
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
    margin: "5px",
  },
}));

const SearchBox = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.searchPaper}>
      <div className={classes.searchContainer}>
        <TextField
          className={classes.searchInput}
          id="standard-search"
          label="e.g. peanut butter cookies"
          type="search"
        />
        <SearchIcon className={classes.searchIcon} />
      </div>
      <Typography variant="subtitle1" display="block" align="center">
        Refine search by: Calories, Diet, Ingredients
      </Typography>
    </Paper>
  );
};

export default SearchBox;
