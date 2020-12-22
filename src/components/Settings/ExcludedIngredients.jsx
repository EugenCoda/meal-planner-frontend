import React from "react";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ingredientList from "../../data/ingredients";

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
  ingredientsContainer: {
    padding: "20px",
  },
});

const ExcludedIngredients = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.mainContainer}>
      <Typography variant="h5" className={classes.title}>
        Excluded Ingredients:
      </Typography>
      <Grid container spacing={2} className={classes.ingredientsContainer}>
        {ingredientList.map((ingredient) => (
          <Grid item key={ingredient.id}>
            <Button variant="contained">{ingredient.name}</Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ExcludedIngredients;
