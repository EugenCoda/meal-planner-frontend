import React from "react";
import { Grid, Paper, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RecipeCard from "../components/RecipeCard";
import recipeList from "../data/recipes";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  recipesContainer: {
    paddingTop: "20px",
  },
});

const Favorites = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getRecipeCard = (recipe) => {
    return (
      <Grid key={recipe.id} item xs={6} sm={4} md={3}>
        <RecipeCard {...recipe} />
      </Grid>
    );
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          // orientation="vertical"
        >
          <Tab label="Breakfast(1)" />
          <Tab label="Lunch(5)" />
          <Tab label="Dinner(23)" />
          <Tab label="Deserts(3)" />
          <Tab label="Snacks(7)" />
        </Tabs>
      </Paper>

      <Grid container spacing={1} className={classes.recipesContainer}>
        {recipeList.map((recipe) => getRecipeCard(recipe))}
      </Grid>
    </>
  );
};

export default Favorites;
