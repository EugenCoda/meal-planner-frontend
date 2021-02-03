import React from "react";
import { Typography } from "@material-ui/core";

const CurrentWeek = ({ today, currentWeek, currentMonth, currentYear }) => {
  return (
    <>
      <Typography>Date: {today}</Typography>
      <Typography>Month: {currentMonth}</Typography>
      <Typography>
        Week number is: {currentWeek} of year
        {" " + currentYear}
      </Typography>
    </>
  );
};

export default CurrentWeek;
