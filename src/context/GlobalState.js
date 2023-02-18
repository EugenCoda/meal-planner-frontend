import React, { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReducer";
import ingredients from "../data/ingredients";
import recipeList from "../data/recipes";

// Initial state
const initialState = {
  ingredients: ingredients,
  recipes: recipeList,
  weeklyPlan: [],
  searchFilter: "",
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
  function createDailyPlan(selectedDate) {
    dispatch({
      type: "CREATE_DAILY_PLAN",
      payload: selectedDate,
    });
  }

  function addToDailyPlan(recipe, selectedDate, mealType) {
    dispatch({
      type: "ADD_TO_DAILY_PLAN",
      payload: { recipe, selectedDate, mealType },
    });
  }

  function removeFromDailyPlan(dailyPlan, mealType) {
    dispatch({
      type: "REMOVE_FROM_DAILY_PLAN",
      payload: { dailyPlan, mealType },
    });
  }

  function addToFavorites(recipeId) {
    dispatch({
      type: "ADD_FAVORITES",
      payload: recipeId,
    });
  }

  function setSearchFilter(text) {
    dispatch({
      type: "SET_SEARCH_FILTER",
      payload: text,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        recipes: state.recipes,
        ingredients: state.ingredients,
        weeklyPlan: state.weeklyPlan,
        searchFilter: state.searchFilter,
        createDailyPlan,
        addToDailyPlan,
        removeFromDailyPlan,
        addToFavorites,
        setSearchFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
