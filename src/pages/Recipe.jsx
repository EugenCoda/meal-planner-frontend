import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Button, Link } from "@material-ui/core";

const Recipe = (props) => {
  const { recipes } = useContext(GlobalContext);
  const { match, history } = props;
  const { params } = match;
  const { recipeID } = params;

  const {
    id,
    recipeName,
    recipePublisher,
    recipeURL,
    mealType,
    imgURL,
  } = recipes[recipeID - 1];

  return (
    <>
      <img src={imgURL} alt={recipeName} />
      <div>Recipe ID: {id}</div>
      <div>Recipe Name: {recipeName}</div>
      <div>Meal Type: {mealType}</div>

      <Button variant="contained" onClick={() => history.push("/")}>
        Home
      </Button>
      <Link href={recipeURL} target="_blank" color="inherit">
        {recipePublisher}
      </Link>
    </>
  );
};

export default Recipe;
