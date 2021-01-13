import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Button } from "@material-ui/core";

const RecipeCardSmall = (props) => {
  const { addToWeeklyPlan } = useContext(GlobalContext);
  const { recipe, day } = props;
  return (
    <Button
      onClick={() => {
        // TODO - add day to the weeklyPlan, if doesn't exist yet
        console.log(day);
        addToWeeklyPlan(recipe);
      }}
    >
      {recipe.recipeName}
    </Button>
  );
};

export default RecipeCardSmall;
