import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getNutritionStats } from "../utils/getNutritionStats";

const useStyles = makeStyles({
  recipeImage: {
    maxWidth: 300,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  recipeIngredientImageWrapper: {
    width: "110px",
    height: "105px",
    verticalAlign: "middle",
    textAlign: "center",
    lineHeight: "100px",
    backgroundColor: "#fff",
    position: "relative",
  },
  recipeIngredientImage: {
    maxWidth: "100px",
    maxHeight: "69px",
    verticalAlign: "middle",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  recipeDetails: {
    padding: 20,
  },
});

const Recipe = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { recipeID } = params;
  const classes = useStyles();

  // Items from Global Context
  const { recipes, ingredients } = useContext(GlobalContext);
  const {
    recipeName,
    recipePublisher,
    recipeURL,
    mealType,
    imgURL,
    totalTime,
    servings,
    ingredients: recipeIngredients,
    directions,
  } = recipes[recipeID - 1];

  return (
    <Grid item container>
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
        className={classes.recipeDetails}
      >
        <Grid item style={{ padding: "0 0 20px 0" }}>
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
          <Typography variant="subtitle2" gutterBottom>
            Nutritional Values (per 100g):{" "}
            {getNutritionStats(recipeIngredients, ingredients, servings)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="initial" gutterBottom>
            Ingredients
          </Typography>
        </Grid>
        {recipeIngredients ? (
          <Grid item container spacing={2}>
            {recipeIngredients.map((recipeIngredient) => {
              // Search ingredient in the database after recipe ingredient ID
              const dbIngredient = ingredients.filter(
                (ingredient) => ingredient.id === recipeIngredient.id
              );
              return (
                <Grid
                  container
                  xs={12}
                  sm={6}
                  md={4}
                  item
                  direction="column"
                  alignItems="center"
                  justify="flex-start"
                  key={recipeIngredient.id}
                >
                  <Grid item>
                    <div className={classes.recipeIngredientImageWrapper}>
                      <img
                        alt={dbIngredient[0].name}
                        src={dbIngredient[0].img}
                        className={classes.recipeIngredientImage}
                      />
                    </div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="initial" gutterBottom>
                      {recipeIngredient.originalName.toLowerCase()}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        ) : null}
        <Grid item style={{ padding: "20px 0" }}>
          <Typography variant="h6" color="initial" gutterBottom>
            Directions
          </Typography>

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
        </Grid>
        <Grid
          item
          container
          justify="flex-start"
          spacing={1}
          style={{ padding: "20px 0" }}
        >
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
