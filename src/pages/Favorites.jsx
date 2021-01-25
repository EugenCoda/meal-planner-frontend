import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "../context/GlobalState";
import { Grid, Paper, Tabs, Tab, Box, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getRecipeCard } from "../utils/getRecipeCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`favorite-recipe-tabpanel-${index}`}
      aria-labelledby={`favorite-recipe-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `favorite-recipe-tab-${index}`,
    "aria-controls": `favorite-recipe-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  recipesContainer: {
    paddingTop: "20px",
  },
  tab: {
    [theme.breakpoints.down("lg")]: {
      minWidth: 120,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.85rem",
      minWidth: 80,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.725rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
}));

const Favorites = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const tabsProps = {
    orientation: isSmallScreen ? "vertical" : "horizontal",
  };

  // Items from Global Context
  const { recipes } = useContext(GlobalContext);

  // Select all favorite recipes
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);
  // Select favorite recipes based on meal type
  const favoriteBreakfastRecipes = favoriteRecipes.filter(
    (recipe) => recipe.mealType === "breakfast"
  );
  const favoriteLunchRecipes = favoriteRecipes.filter(
    (recipe) => recipe.mealType === "lunch"
  );
  const favoriteDinnerRecipes = favoriteRecipes.filter(
    (recipe) => recipe.mealType === "dinner"
  );
  const favoriteSnackRecipes = favoriteRecipes.filter(
    (recipe) => recipe.mealType === "snack"
  );
  const favoriteDessertRecipes = favoriteRecipes.filter(
    (recipe) => recipe.mealType === "dessert"
  );

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          {...tabsProps}
          value={value}
          onChange={handleChange}
          aria-label="favorite recipe tabs"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            className={classes.tab}
            label={`All(${favoriteRecipes.length})`}
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            label={`Breakfast(${favoriteBreakfastRecipes.length})`}
            {...a11yProps(1)}
          />
          <Tab
            className={classes.tab}
            label={`Lunch(${favoriteLunchRecipes.length})`}
            {...a11yProps(2)}
          />
          <Tab
            className={classes.tab}
            label={`Dinner(${favoriteDinnerRecipes.length})`}
            {...a11yProps(3)}
          />
          <Tab
            className={classes.tab}
            label={`Desserts(${favoriteDessertRecipes.length})`}
            {...a11yProps(4)}
          />
          <Tab
            className={classes.tab}
            label={`Snacks(${favoriteSnackRecipes.length})`}
            {...a11yProps(5)}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Grid container spacing={1} className={classes.recipesContainer}>
          {favoriteRecipes.map((recipe) => getRecipeCard(recipe))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={1} className={classes.recipesContainer}>
          {favoriteBreakfastRecipes.map((recipe) => getRecipeCard(recipe))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={1} className={classes.recipesContainer}>
          {favoriteLunchRecipes.map((recipe) => getRecipeCard(recipe))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid container spacing={1} className={classes.recipesContainer}>
          {favoriteDinnerRecipes.map((recipe) => getRecipeCard(recipe))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Grid container spacing={1} className={classes.recipesContainer}>
          {favoriteDessertRecipes.map((recipe) => getRecipeCard(recipe))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Grid container spacing={1} className={classes.recipesContainer}>
          {favoriteSnackRecipes.map((recipe) => getRecipeCard(recipe))}
        </Grid>
      </TabPanel>
    </>
  );
};

export default Favorites;
