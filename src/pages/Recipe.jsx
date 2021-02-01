import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  recipeImage: {
    maxWidth: 300,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  ingredientImage: {
    maxWidth: 100,
  },
});

const Recipe = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { recipeID } = params;
  const classes = useStyles();

  // Items from Global Context
  const { recipes } = useContext(GlobalContext);
  const {
    recipeName,
    recipePublisher,
    recipeURL,
    mealType,
    imgURL,
    totalTime,
    servings,
    ingredients,
    directions,
  } = recipes[recipeID - 1];

  return (
    <Grid item container spacing={3}>
      <Grid item xs={12} sm={5} md={4}>
        <img src={imgURL} alt={recipeName} className={classes.recipeImage} />
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={7}
        md={8}
        direction="column"
        spacing={5}
        className={classes.recipeDetails}
      >
        <Grid item>
          <Typography variant="h6" color="initial" gutterBottom>
            {recipeName}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Meal Type: {mealType}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Ready in: {totalTime} min
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Servings: {servings}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="initial" gutterBottom>
            Ingredients
          </Typography>
        </Grid>
        {ingredients ? (
          <Grid item container spacing={2}>
            {ingredients.map((ingredient) => {
              return (
                <Grid item key={ingredient.id}>
                  <img
                    alt={ingredient.name}
                    src={ingredient.img}
                    className={classes.ingredientImage}
                  />
                  {ingredient.originalName}
                </Grid>
              );
            })}
          </Grid>
        ) : null}
        <Grid item>
          <Typography variant="h6" color="initial" gutterBottom>
            Directions
          </Typography>
        </Grid>
        {directions ? (
          <Grid item container spacing={2}>
            {directions.map((direction) => {
              return (
                <Grid item key={direction.step}>
                  <Typography variant="button">
                    {`Step ${direction.step}: `}
                  </Typography>
                  {direction.description}
                </Grid>
              );
            })}
          </Grid>
        ) : null}
        <Grid item container justify="flex-start" spacing={1}>
          <Grid item>
            <Button variant="contained" onClick={() => history.push("/")}>
              Home
            </Button>
          </Grid>
          <Grid item>
            <Button
              href={recipeURL}
              target="_blank"
              variant="contained"
              color="inherit"
            >
              Full Instructions
            </Button>
          </Grid>
          <Grid item style={{ padding: "10px 0" }}>
            <Typography variant="subtitle2">on {recipePublisher}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Recipe;
