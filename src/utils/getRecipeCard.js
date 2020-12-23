import React from "react";
import { Grid } from "@material-ui/core";
import RecipeCard from "../components/RecipeCard";

export const getRecipeCard = (recipe, history) => {
  return (
    <Grid key={recipe.id} item xs={6} sm={4} md={3}>
      <RecipeCard {...recipe} history={history} />
    </Grid>
  );
};
