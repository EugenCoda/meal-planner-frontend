import React from "react";
import { Typography } from "@material-ui/core";

const CurrentWeek = ({ today, currentWeek, currentYear }) => {
  return (
    <>
      <Typography>Today is: {today}</Typography>
      <Typography>
        Week number is: {currentWeek} of year
        {" " + currentYear}
      </Typography>
    </>
  );
};

export default CurrentWeek;
