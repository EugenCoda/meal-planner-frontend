export const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        loading: false,
        recipes: action.payload,
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
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
