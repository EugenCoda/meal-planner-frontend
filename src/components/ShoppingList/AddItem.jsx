import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";

const AddItem = () => {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <TextField id="standard-search" label="Add item" type="search" />
      </Grid>
      <Grid item>
        <TextField id="quantity" label="Quantity" type="search" />
      </Grid>
      <Grid item>
        <TextField id="size" label="Size" type="search" />
      </Grid>
      <Grid item>
        <TextField id="category" label="Category" type="search" />
      </Grid>
      <Grid item style={{ padding: "15px 0" }}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddItem;
