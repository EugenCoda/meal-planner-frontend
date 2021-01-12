import React from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minHeight: "80px",
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
});

const MealType = (props) => {
  const classes = useStyles();
  const { mealType } = props;
  return (
    <Grid item container direction="column" className={classes.root}>
      <Typography variant="overline">{mealType}</Typography>
      <IconButton aria-label="add meal">
        {<AddCircleOutlineIcon fontSize="large" />}
      </IconButton>
    </Grid>
  );
};

export default MealType;
