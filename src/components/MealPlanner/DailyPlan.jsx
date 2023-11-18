import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MealType from "./MealType";

const useStyles = makeStyles({
  root: {
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  dayTitle: {
    paddingRight: "50px",
    paddingLeft: "50px",
  },
});

const DailyPlan = ({ day, today, currentWeek, currentYear }) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="overline"
        className={classes.dayTitle}
        style={day.date === today ? { color: "red" } : null}
      >
        {day.date}
      </Typography>
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="column">
          <MealType
            mealType="Breakfast"
            day={day}
            currentWeek={currentWeek}
            currentYear={currentYear}
          />
          <MealType
            mealType="Lunch"
            day={day}
            currentWeek={currentWeek}
            currentYear={currentYear}
          />
          <MealType
            mealType="Dinner"
            day={day}
            currentWeek={currentWeek}
            currentYear={currentYear}
          />
          <MealType
            mealType="Snack"
            day={day}
            currentWeek={currentWeek}
            currentYear={currentYear}
          />

          {/* <Grid item container direction="column">
            <Typography variant="caption">Calories: 2.100</Typography>
            <Typography variant="caption">Fat:75g</Typography>
            <Typography variant="caption">Protein: 120g</Typography>
            <Typography variant="caption">Carbs: 143g</Typography>
          </Grid> */}
        </Grid>
      </Paper>
    </>
  );
};

export default DailyPlan;
