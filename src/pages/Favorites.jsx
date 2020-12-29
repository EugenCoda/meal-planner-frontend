import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Grid, Paper, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getRecipeCard } from "../utils/getRecipeCard";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  recipesContainer: {
    paddingTop: "20px",
  },
});

const Favorites = (props) => {
  const { recipes } = useContext(GlobalContext);
  // Select only the favorite recipes
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);
  const { history } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        {favoriteRecipes.map((recipe) => getRecipeCard(recipe, history))}
      </Grid>
    </>
  );
};

export default Favorites;
