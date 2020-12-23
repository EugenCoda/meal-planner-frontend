import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import recipeList from "../data/recipes";

// Initial state
const initialState = {
  recipes: recipeList,
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions

  return (
    <GlobalContext.Provider
      value={{
        recipes: state.recipes,
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
