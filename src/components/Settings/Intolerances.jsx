import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  //   mainContainer: {
  //     padding: "20px",
  //   },
  title: {
    paddingLeft: "20px",
    paddingTop: "10px",
  },
  allergiesContainer: {
    padding: "20px",
  },
});

const Intolerances = () => {
  const classes = useStyles();
  const { allergies, selectAllergy } = useContext(GlobalContext);

  return (
    <Paper className={classes.mainContainer}>
      <Typography variant="h5" className={classes.title}>
        Intolerances:
      </Typography>
      <Grid container spacing={2} className={classes.allergiesContainer}>
        {allergies.map((allergy) => (
          <Grid item key={allergy.id}>
            {allergy.isSelected ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                onClick={() => {
                  selectAllergy(allergy.id);
                }}
              >
                {allergy.name}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  selectAllergy(allergy.id);
                }}
              >
                {allergy.name}
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Intolerances;
