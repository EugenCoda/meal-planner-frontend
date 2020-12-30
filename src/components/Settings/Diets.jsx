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
  dietsContainer: {
    padding: "20px",
  },
});

const Diets = () => {
  const classes = useStyles();
  const { diets, selectDiet } = useContext(GlobalContext);
  return (
    <Paper className={classes.mainContainer}>
      <Typography variant="h5" className={classes.title}>
        Diets:
      </Typography>
      <Grid container spacing={2} className={classes.dietsContainer}>
        {diets.map((diet) => (
          <Grid item key={diet.id}>
            {diet.isSelected ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                onClick={() => {
                  selectDiet(diet.id);
                }}
              >
                {diet.name}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  selectDiet(diet.id);
                }}
              >
                {diet.name}
              </Button>
            )}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Diets;
