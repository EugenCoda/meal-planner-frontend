import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  media: {
    width: 120,
    height: 120,
  },
  cardHeader: {
    padding: 0,
  },
});

const MealCard = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { mealType, dailyPlan } = props;
  const { breakfast, lunch, dinner, snack } = dailyPlan;
  let id, recipeName, imgURL;
  switch (mealType) {
    case "Breakfast":
      id = breakfast.id;
      recipeName = breakfast.recipeName;
      imgURL = breakfast.imgURL;
      break;
    case "Lunch":
      id = lunch.id;
      recipeName = lunch.recipeName;
      imgURL = lunch.imgURL;
      break;
    case "Dinner":
      id = dinner.id;
      recipeName = dinner.recipeName;
      imgURL = dinner.imgURL;
      break;
    default:
      id = snack.id;
      recipeName = snack.recipeName;
      imgURL = snack.imgURL;
      break;
  }

  return (
    <>
      <Card className={classes.media}>
        <CardActionArea onClick={() => history.push(`/recipe/${id}`)}>
          <CardMedia
            component="img"
            alt={recipeName}
            image={imgURL}
            title={recipeName}
          />
        </CardActionArea>
      </Card>
    </>
  );
};

export default MealCard;
