import React, { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReducer";
import allergies from "../data/allergies";
import diets from "../data/diets";
import ingredients from "../data/ingredients";
import recipeList from "../data/recipes";
import moment from "moment";

// Initial state
const initialState = {
  allergies: allergies,
  diets: diets,
  ingredients: ingredients,
  recipes: recipeList,
  shoppingList: [],
  searchFilter: "",
  error: null,
  loading: true,
  dates: {
    today: moment().format("LL").toString(),
    currentWeek: moment().isoWeek().toString(),
    currentYear: moment().year().toString(),
    weekDays: [
      {
        id: 1,
        weekDay: "Monday",
        date: moment().startOf("isoWeek").format("ddd DD").toString(),
      },
      {
        id: 2,
        weekDay: "Tuesday",
        date: moment()
          .startOf("isoWeek")
          .add(1, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 3,
        weekDay: "Wednesday",
        date: moment()
          .startOf("isoWeek")
          .add(2, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 4,
        weekDay: "Thursday",
        date: moment()
          .startOf("isoWeek")
          .add(3, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 5,
        weekDay: "Friday",
        date: moment()
          .startOf("isoWeek")
          .add(4, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 6,
        weekDay: "Saturday",
        date: moment()
          .startOf("isoWeek")
          .add(5, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 7,
        weekDay: "Sunday",
        date: moment().endOf("isoWeek").format("ddd DD").toString(),
      },
    ],
  },
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

  function addShoppingItem(shoppingItem) {
    dispatch({
      type: "ADD_SHOPPING_ITEM",
      payload: shoppingItem,
    });
  }

  function markShoppingItemCompleted(id) {
    dispatch({
      type: "MARK_SHOPPING_ITEM_COMPLETED",
      payload: id,
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
        diets: state.diets,
        ingredients: state.ingredients,
        allergies: state.allergies,
        shoppingList: state.shoppingList,
        searchFilter: state.searchFilter,
        dates: state.dates,
        addToFavorites,
        selectDiet,
        selectIngredient,
        selectAllergy,
        addShoppingItem,
        markShoppingItemCompleted,
        setSearchFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
