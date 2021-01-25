import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Grid, Typography } from "@material-ui/core";

import MealCard from "./MealCard";
import AddMealButton from "./AddMealButton";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minHeight: 160,
    minWidth: 120,
    height: 160,
    width: 120,
  },
});

const MealType = ({ mealType, day, currentWeek, currentYear }) => {
  const classes = useStyles();

  // Items from Global Context
  const { weeklyPlan } = useContext(GlobalContext);

  let selectedDate = currentYear + currentWeek + day.date;
  const dailyPlan = weeklyPlan.filter((item) => item.id === selectedDate);

  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="overline">{mealType}</Typography>
      </Grid>
      <Grid item>
        {(mealType === "Breakfast" && dailyPlan[0] && dailyPlan[0].breakfast) ||
        (mealType === "Lunch" && dailyPlan[0] && dailyPlan[0].lunch) ||
        (mealType === "Dinner" && dailyPlan[0] && dailyPlan[0].dinner) ||
        (mealType === "Snack" && dailyPlan[0] && dailyPlan[0].snack) ? (
          <MealCard mealType={mealType} dailyPlan={dailyPlan[0]} />
        ) : (
          <AddMealButton mealType={mealType} selectedDate={selectedDate} />
        )}
      </Grid>
    </Grid>
  );
};

export default MealType;
