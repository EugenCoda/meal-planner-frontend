import React from "react";
import { Typography, Grid } from "@material-ui/core";

// Calculate nutrition stats for the recipe
export const getNutritionStats = (recipeIngredients, ingredients, servings) => {
  let calories = 0;
  let fats = 0;
  let proteins = 0;
  let carbs = 0;
  let totalWeight = 0;
  recipeIngredients.forEach((recipeIngredient) => {
    // Search ingredient in the database after recipe ingredient ID
    const dbIngredient = ingredients.filter(
      (ingredient) => ingredient.id === recipeIngredient.id
    );
    calories +=
      (recipeIngredient.amount.metric.amount / 100) *
      dbIngredient[0].nutritionPer100g.nutrients[0].amount;
    fats +=
      (recipeIngredient.amount.metric.amount / 100) *
      dbIngredient[0].nutritionPer100g.nutrients[1].amount;
    proteins +=
      (recipeIngredient.amount.metric.amount / 100) *
      dbIngredient[0].nutritionPer100g.nutrients[2].amount;
    carbs +=
      (recipeIngredient.amount.metric.amount / 100) *
      dbIngredient[0].nutritionPer100g.nutrients[3].amount;
    totalWeight += recipeIngredient.amount.metric.amount;
  });
  //   console.log("calories per 100g: " + (calories / totalWeight) * 100);
  //   console.log("calories per serving: " + calories / servings);
  //   console.log("fats per 100g: " + (fats / totalWeight) * 100);
  //   console.log("fats per serving: " + fats / servings);
  //   console.log("proteins per 100g: " + (proteins / totalWeight) * 100);
  //   console.log("proteins per serving: " + proteins / servings);
  //   console.log("carbs per 100g: " + (carbs / totalWeight) * 100);
  //   console.log("carbs per serving: " + carbs / servings);
  //   console.log("total weight: " + totalWeight);
  //   console.log("weight per serving: " + totalWeight / servings);
  return (
    <>
      {/* <Typography>
        Calories per serving: {(calories / servings).toFixed(2)}
      </Typography>
      <Typography>Fats per serving: {(fats / servings).toFixed(2)}</Typography>
      <Typography>
        Proteins per serving: {(proteins / servings).toFixed(2)}
      </Typography>
      <Typography>
        Carbs per serving: {(carbs / servings).toFixed(2)}
      </Typography> */}
      <Grid item container>
        <Grid item style={{ padding: "5px 20px" }}>
          <Typography variant="subtitle2" gutterBottom>
            Calories : {((calories / totalWeight) * 100).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item style={{ padding: "5px 20px" }}>
          <Typography variant="subtitle2" gutterBottom>
            Fats : {((fats / totalWeight) * 100).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item style={{ padding: "5px 20px" }}>
          <Typography variant="subtitle2" gutterBottom>
            Proteins : {((proteins / totalWeight) * 100).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item style={{ padding: "5px 20px" }}>
          <Typography variant="subtitle2" gutterBottom>
            Carbs : {((carbs / totalWeight) * 100).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
