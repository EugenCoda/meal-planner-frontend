import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import SearchIcon from "@material-ui/icons/Search";
import {
  Paper,
  Typography,
  Grid,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { fade, makeStyles } from "@material-ui/core/styles";

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
      {/* <Paper className={classes.searchPaper}>
        <div className={classes.searchContainer}>
          <TextField
            onChange={handleSearchChange}
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
      </Paper> */}
      <Formik
        initialValues={{
          query: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid item style={{ padding: "20px 5px" }}>
                <Field
                  component={TextField}
                  name="query"
                  type="text"
                  label="e.g. peanut butter cookies"
                  // onChange={handleSearchChange}
                />
              </Grid>

              {isSubmitting && <LinearProgress />}

              <Grid item style={{ padding: "30px 10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchBox;
