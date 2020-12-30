import React, { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReducer";
import allergies from "../data/allergies";
import diets from "../data/diets";
import ingredients from "../data/ingredients";
import recipeList from "../data/recipes";
import shoppingList from "../data/shoppingList";

// Initial state
const initialState = {
  allergies: allergies,
  diets: diets,
  ingredients: ingredients,
  recipes: recipeList,
  shoppingList: shoppingList,
  error: null,
  loading: true,
};

const getLocalStorage = () => {
  let localState = localStorage.getItem("localState");
  if (localState) {
    return JSON.parse(localState);
  } else {
    return initialState;
  }
};
// Create context
export const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, [], getLocalStorage);

  useEffect(() => {
    localStorage.setItem("localState", JSON.stringify(state));
  }, [state]);

  //Actions
  function addToFavorites(recipeId) {
    dispatch({
      type: "ADD_FAVORITES",
      payload: recipeId,
    });
  }

  function selectDiet(id) {
    dispatch({
      type: "SELECT_DIET",
      payload: id,
    });
  }

  function selectIngredient(id) {
    dispatch({
      type: "SELECT_INGREDIENT",
      payload: id,
    });
  }
  function selectAllergy(id) {
    dispatch({
      type: "SELECT_ALLERGY",
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        recipes: state.recipes,
        diets: state.diets,
        ingredients: state.ingredients,
        allergies: state.allergies,
        shoppingList: state.shoppingList,
        addToFavorites,
        selectDiet,
        selectIngredient,
        selectAllergy,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
