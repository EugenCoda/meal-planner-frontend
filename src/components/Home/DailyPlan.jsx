import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import MealType from "./MealType";

const useStyles = makeStyles({
  root: {
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  dayTitle: {
    textAlign: "center",
  },
  media: {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    zIndex: 1,
  },
  avatar: {
    backgroundColor: red[500],
    width: 20,
    height: 20,
    top: "20px",
    left: 0,
    zIndex: 2,
  },
});

const DailyPlan = (props) => {
  const classes = useStyles();
  const { day } = props;

  return (
    <>
      <Typography variant="overline" className={classes.dayTitle}>
        {day}
      </Typography>
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="column">
          <MealType mealType="Breakfast" />
          <MealType mealType="Lunch" />
          <MealType mealType="Dinner" />
          <MealType mealType="Snack" />

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
