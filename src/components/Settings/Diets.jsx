import React from "react";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dietList from "../../data/diets";

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
  dietsContainer: {
    padding: "20px",
  },
});

const Diets = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.mainContainer}>
      <Typography variant="h5" className={classes.title}>
        Diets:
      </Typography>
      <Grid container spacing={2} className={classes.dietsContainer}>
        {dietList.map((diet) => (
          <Grid item key={diet.id}>
            <Button variant="contained">{diet.name}</Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Diets;
