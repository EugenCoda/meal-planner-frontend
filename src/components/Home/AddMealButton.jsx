import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import {
  IconButton,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  heading: {
    fontSize: 14,
  },
});

const AddMealButton = ({ mealType, selectedDate }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Items from Global Context
  const { recipes, weeklyPlan, addToDailyPlan, createDailyPlan } = useContext(
    GlobalContext
  );

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
  // const favoriteDessertRecipes = favoriteRecipes.filter(
  //   (recipe) => recipe.mealType === "dessert"
  // );

  // Handle Actions for Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  // Close Dialog if clicked away or Cancel
  const handleCancel = () => {
    setOpen(false);
  };
  // Close Dialog if clicked Add to Calendar
  const handleClose = () => {
    if (weeklyPlan.length === 0) {
      createDailyPlan(selectedDate);
      addToDailyPlan(selectedRecipe, selectedDate, mealType);
    } else {
      let found = false;
      weeklyPlan.forEach((item) => {
        if (item.id === selectedDate) {
          addToDailyPlan(selectedRecipe, selectedDate, mealType);
          found = true;
          return;
        }
      });
      if (!found) {
        createDailyPlan(selectedDate);
        addToDailyPlan(selectedRecipe, selectedDate, mealType);
      }
    }
    setOpen(false);
  };

  // Handle Actions for Accordion
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Recipe Button actions
  const [selectedRecipe, setSelectedRecipe] = useState({});

  const handleRecipeButtonClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <>
      <IconButton aria-label="add meal" onClick={handleClickOpen}>
        {<AddCircleOutlineIcon fontSize="large" />}
      </IconButton>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Click on a recipe to select it"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>Breakfast</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {favoriteBreakfastRecipes.map((recipe) => (
                  <Button
                    key={recipe.id}
                    style={
                      selectedRecipe.id === recipe.id
                        ? { backgroundColor: "green" }
                        : null
                    }
                    onClick={() => {
                      handleRecipeButtonClick(recipe);
                    }}
                  >
                    {recipe.recipeName}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classes.heading}>Lunch</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {favoriteLunchRecipes.map((recipe) => (
                  <Button
                    key={recipe.id}
                    style={
                      selectedRecipe.id === recipe.id
                        ? { backgroundColor: "green" }
                        : null
                    }
                    onClick={() => {
                      handleRecipeButtonClick(recipe);
                    }}
                  >
                    {recipe.recipeName}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={classes.heading}>Dinner</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {favoriteDinnerRecipes.map((recipe) => (
                  <Button
                    key={recipe.id}
                    style={
                      selectedRecipe.id === recipe.id
                        ? { backgroundColor: "green" }
                        : null
                    }
                    onClick={() => {
                      handleRecipeButtonClick(recipe);
                    }}
                  >
                    {recipe.recipeName}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>Snack</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {favoriteSnackRecipes.map((recipe) => (
                  <Button
                    key={recipe.id}
                    style={
                      selectedRecipe.id === recipe.id
                        ? { backgroundColor: "green" }
                        : null
                    }
                    onClick={() => {
                      handleRecipeButtonClick(recipe);
                    }}
                  >
                    {recipe.recipeName}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Add to calendar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMealButton;
