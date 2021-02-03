import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import {
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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  heading: {
    fontSize: 14,
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddMealDialog = ({ mealType, selectedDate, open, setOpen }) => {
  let history = useHistory();
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

  // Close Dialog if clicked away or Cancel
  const handleCancel = () => {
    setOpen(false);
  };
  // Close Dialog if clicked Add to Calendar
  const handleClose = () => {
    if (!selectedRecipe.id) {
      // Open the warning message snackbar
      setSnackbarOpen(true);
    } else {
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

  // Snackbar actions - display warning message if no recipe is selected
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
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
                {favoriteBreakfastRecipes.length !== 0 ? (
                  favoriteBreakfastRecipes.map((recipe) => (
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
                  ))
                ) : (
                  <Typography>
                    No recipes found in your favorites. Click
                    <Link
                      variant="string"
                      onClick={() => history.push("/search")}
                      style={{ paddingRight: 5, paddingLeft: 5 }}
                    >
                      here
                    </Link>
                    to search for new recipes.
                  </Typography>
                )}
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
                {favoriteLunchRecipes.length !== 0 ? (
                  favoriteLunchRecipes.map((recipe) => (
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
                  ))
                ) : (
                  <Typography>
                    No recipes found in your favorites. Click
                    <Link
                      variant="string"
                      onClick={() => history.push("/search")}
                      style={{ paddingRight: 5, paddingLeft: 5 }}
                    >
                      here
                    </Link>
                    to search for new recipes.
                  </Typography>
                )}
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
                {favoriteDinnerRecipes.length !== 0 ? (
                  favoriteDinnerRecipes.map((recipe) => (
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
                  ))
                ) : (
                  <Typography>
                    No recipes found in your favorites. Click
                    <Link
                      variant="string"
                      onClick={() => history.push("/search")}
                      style={{ paddingRight: 5, paddingLeft: 5 }}
                    >
                      here
                    </Link>
                    to search for new recipes.
                  </Typography>
                )}
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
                {favoriteSnackRecipes.length !== 0 ? (
                  favoriteSnackRecipes.map((recipe) => (
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
                  ))
                ) : (
                  <Typography>
                    No recipes found in your favorites. Click
                    <Link
                      variant="string"
                      onClick={() => history.push("/search")}
                      style={{ paddingRight: 5, paddingLeft: 5 }}
                    >
                      here
                    </Link>
                    to search for new recipes.
                  </Typography>
                )}
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="warning">
          No recipe selected!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddMealDialog;
