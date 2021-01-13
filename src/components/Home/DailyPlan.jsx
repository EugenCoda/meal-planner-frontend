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
    textAlign: "center",
  },
});

const DailyPlan = (props) => {
  const classes = useStyles();
  const { day } = props;

  return (
    <>
      <Typography variant="overline" className={classes.dayTitle}>
        {day.date}
      </Typography>
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="column">
          <MealType mealType="Breakfast" day={day} />
          <MealType mealType="Lunch" day={day} />
          <MealType mealType="Dinner" day={day} />
          <MealType mealType="Snack" day={day} />

          <Grid item container direction="column">
            <Typography variant="caption">Calories: 2.100</Typography>
            <Typography variant="caption">Fat:75g</Typography>
            <Typography variant="caption">Protein: 120g</Typography>
            <Typography variant="caption">Carbs: 143g</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default DailyPlan;
