import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Grid } from "@material-ui/core";
import CurrentWeek from "../components/Home/CurrentWeek";
import DailyPlan from "../components/Home/DailyPlan";

const Home = () => {
  const { dates } = useContext(GlobalContext);
  const { weekDays } = dates;

  return (
    <>
      <Grid container direction="column">
        <Grid item style={{ paddingBottom: 20 }}>
          <CurrentWeek />
        </Grid>
        <Grid container justify="space-around">
          <Grid item xs={1}>
            {" "}
            Recipes to choose from
          </Grid>
          <Grid item container xs={11}>
            {weekDays.map((day) => {
              return (
                <Grid key={day.id} item>
                  <DailyPlan day={day.date} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
