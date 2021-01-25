import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";

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

  // Items from Global Context
  const { ingredients, selectIngredient } = useContext(GlobalContext);

  return (
    <Paper className={classes.mainContainer}>
      <Typography variant="h5" className={classes.title}>
        Excluded Ingredients:
      </Typography>
      <Grid container spacing={2} className={classes.ingredientsContainer}>
        {ingredients.map((ingredient) => (
          <Grid item key={ingredient.id}>
            {ingredient.isSelected ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                onClick={() => {
                  selectIngredient(ingredient.id);
                }}
              >
                {ingredient.name}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  selectIngredient(ingredient.id);
                }}
              >
                {ingredient.name}
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ExcludedIngredients;
