import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import SearchBox from "../components/Search/SearchBox";
import RecipeCard from "../components/RecipeCard";
import recipeList from "../data/recipes";

const Search = () => {
  const getRecipeCard = (recipe) => {
    return (
      <Grid key={recipe.id} item xs={6} sm={4} md={3}>
        <RecipeCard {...recipe} />
      </Grid>
    );
  };
  return (
    <Box>
      <Grid container>
        <Grid item container style={{ paddingBottom: 20 }}>
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10}>
            <SearchBox />
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10}>
            <Typography variant="subtitle1" gutterBottom>
              Showing recipes for peanut butter cookies (1-10 out of 26 results)
            </Typography>
            <Grid container spacing={1}>
              {recipeList.map((recipe) => getRecipeCard(recipe))}
            </Grid>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
