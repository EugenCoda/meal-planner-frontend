import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Typography, Grid, Button, TextField } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "150px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.5),
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

  // Items from Global Context
  const { searchFilter, setSearchFilter } = useContext(GlobalContext);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchFilter(e.target.value);
  };

  const handleClearResults = () => {
    setSearchFilter("");
  };

  return (
    <>
      <Paper elevation={0} className={classes.searchPaper}>
        <div className={classes.searchContainer}>
          <TextField
            className={classes.searchInput}
            id="standard-search"
            label="e.g. peanut butter cookies"
            type="search"
            value={searchFilter}
            onChange={handleSearchChange}
          />
          <SearchIcon className={classes.searchIcon} />
        </div>
        {/* <Typography variant="subtitle1" display="block" align="center">
          Refine search by: Calories, Diet, Ingredients
        </Typography> */}
        {searchFilter !== "" ? (
          <Grid item container spacing={2} className={classes.searchContainer}>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                Showing recipes for{" "}
                <strong>{`${searchFilter.toLowerCase()}`}</strong>
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleClearResults}
              >
                Clear results
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Paper>
    </>
  );
};

export default SearchBox;
