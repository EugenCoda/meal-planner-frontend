import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Typography } from "@material-ui/core";

const CurrentWeek = () => {
  const { dates } = useContext(GlobalContext);
  const { today, currentWeek, currentYear } = dates;
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
