import React from "react";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import allergyList from "../../data/allergies";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  //   mainContainer: {
  //     padding: "20px",
  //   },
  title: {
    paddingLeft: "20px",
    paddingTop: "10px",
  },
  allergiesContainer: {
    padding: "20px",
  },
});

const Intolerances = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.mainContainer}>
      <Typography variant="h5" className={classes.title}>
        Intolerances:
      </Typography>
      <Grid container spacing={2} className={classes.allergiesContainer}>
        {allergyList.map((allergy) => (
          <Grid item key={allergy.id}>
            <Button variant="contained">{allergy.name}</Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Intolerances;
