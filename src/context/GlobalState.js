import React, { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReducer";
import allergies from "../data/allergies";
import diets from "../data/diets";
import ingredients from "../data/ingredients";
import recipeList from "../data/recipes";

// Initial state
const initialState = {
  allergies: allergies,
  diets: diets,
  ingredients: ingredients,
  recipes: recipeList,
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
  return (
    <GlobalContext.Provider
      value={{
        recipes: state.recipes,
        addToFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
