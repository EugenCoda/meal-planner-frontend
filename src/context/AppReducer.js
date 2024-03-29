export const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };

    case "CREATE_DAILY_PLAN":
      return {
        ...state,
        loading: false,
        weeklyPlan: [...state.weeklyPlan, { id: action.payload }],
      };

    case "ADD_TO_DAILY_PLAN":
      return {
        ...state,
        loading: false,
        weeklyPlan: state.weeklyPlan.map((item) => {
          if (item.id === action.payload.selectedDate) {
            if (action.payload.mealType === "Breakfast") {
              return {
                ...item,
                breakfast: action.payload.recipe,
              };
            }
            if (action.payload.mealType === "Lunch") {
              return {
                ...item,
                lunch: action.payload.recipe,
              };
            }
            if (action.payload.mealType === "Dinner") {
              return {
                ...item,
                dinner: action.payload.recipe,
              };
            }
            if (action.payload.mealType === "Snack") {
              return {
                ...item,
                snack: action.payload.recipe,
              };
            }
          }
          return { ...item };
        }),
      };

    case "REMOVE_FROM_DAILY_PLAN":
      return {
        ...state,
        loading: false,
        weeklyPlan: state.weeklyPlan.map((item) => {
          if (action.payload.dailyPlan.id === item.id) {
            if (action.payload.mealType === "Breakfast") {
              delete item.breakfast;
            }
            if (action.payload.mealType === "Lunch") {
              delete item.lunch;
            }
            if (action.payload.mealType === "Dinner") {
              delete item.dinner;
            }
            if (action.payload.mealType === "Snack") {
              delete item.snack;
            }
          }
          return { ...item };
        }),
      };

    case "ADD_FAVORITES":
      return {
        ...state,
        loading: false,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === action.payload) {
            return {
              ...recipe,
              isFavorite: !recipe.isFavorite,
            };
          }
          return { ...recipe };
        }),
      };

    case "SET_SEARCH_FILTER":
      return {
        ...state,
        loading: false,
        searchFilter: action.payload,
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
