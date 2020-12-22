import React from "react";
import { Box, Grid } from "@material-ui/core";
import CurrentWeek from "../components/Home/CurrentWeek";
import DailyPlan from "../components/Home/DailyPlan";
import daysOfWeek from "../data/daysOfWeek";

const Home = () => {
  const getDailyPlan = (day) => {
    return (
      <Grid key={day.id} item>
        <DailyPlan {...day} />
      </Grid>
    );
  };
  return (
    <Box>
      <CurrentWeek />
      <Grid container spacing={3}>
        {daysOfWeek.map((day) => getDailyPlan(day))}
      </Grid>
    </Box>
  );
};

export default Home;
