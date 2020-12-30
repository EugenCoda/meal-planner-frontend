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
    case "SELECT_DIET":
      return {
        ...state,
        loading: false,
        diets: state.diets.map((diet) => {
          if (diet.id === action.payload) {
            return {
              ...diet,
              isSelected: !diet.isSelected,
            };
          }
          return { ...diet };
        }),
      };
    case "SELECT_INGREDIENT":
      return {
        ...state,
        loading: false,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient.id === action.payload) {
            return {
              ...ingredient,
              isSelected: !ingredient.isSelected,
            };
          }
          return { ...ingredient };
        }),
      };
    case "SELECT_ALLERGY":
      return {
        ...state,
        loading: false,
        allergies: state.allergies.map((allergy) => {
          if (allergy.id === action.payload) {
            return {
              ...allergy,
              isSelected: !allergy.isSelected,
            };
          }
          return { ...allergy };
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
