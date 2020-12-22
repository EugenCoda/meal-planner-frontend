import React from "react";
import { Grid } from "@material-ui/core";
import Diets from "../components/Settings/Diets";
import ExcludedIngredients from "../components/Settings/ExcludedIngredients";
import Intolerances from "../components/Settings/Intolerances";

const Settings = () => {
  return (
    <Grid container spacing={4} direction="column">
      <Grid item>
        <Diets />
      </Grid>
      <Grid item>
        <Intolerances />
      </Grid>
      <Grid item>
        <ExcludedIngredients />
      </Grid>
    </Grid>
  );
};

export default Settings;
