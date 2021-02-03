import React from "react";
import { Grid } from "@material-ui/core";
import CurrentWeek from "../components/Home/CurrentWeek";
import DailyPlan from "../components/Home/DailyPlan";
import moment from "moment";

const Home = () => {
  let dates = {
    today: moment().format("ddd DD").toString(),
    currentWeek: moment().isoWeek().toString(),
    currentMonth: moment().month("MMM").toString(),
    currentYear: moment().year().toString(),
    weekDays: [
      {
        id: 1,
        weekDay: "Monday",
        date: moment().startOf("isoWeek").format("ddd DD").toString(),
      },
      {
        id: 2,
        weekDay: "Tuesday",
        date: moment()
          .startOf("isoWeek")
          .add(1, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 3,
        weekDay: "Wednesday",
        date: moment()
          .startOf("isoWeek")
          .add(2, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 4,
        weekDay: "Thursday",
        date: moment()
          .startOf("isoWeek")
          .add(3, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 5,
        weekDay: "Friday",
        date: moment()
          .startOf("isoWeek")
          .add(4, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 6,
        weekDay: "Saturday",
        date: moment()
          .startOf("isoWeek")
          .add(5, "d")
          .format("ddd DD")
          .toString(),
      },
      {
        id: 7,
        weekDay: "Sunday",
        date: moment().endOf("isoWeek").format("ddd DD").toString(),
      },
    ],
  };

  return (
    <>
      <Grid container direction="column">
        <Grid item style={{ paddingBottom: 20 }}>
          <CurrentWeek
            today={dates.today}
            currentWeek={dates.currentWeek}
            currentMonth={dates.currentMonth}
            currentYear={dates.currentYear}
          />
        </Grid>
        <Grid item container>
          <Grid item xs={1}>
            {" "}
            {/* Recipes to choose from */}
          </Grid>
          <Grid item container xs={11}>
            {dates.weekDays.map((day) => {
              return (
                <Grid key={day.id} item>
                  <DailyPlan
                    day={day}
                    today={dates.today}
                    currentWeek={dates.currentWeek}
                    currentYear={dates.currentYear}
                  />
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
