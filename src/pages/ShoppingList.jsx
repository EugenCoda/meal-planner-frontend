import React from "react";
import Grid from "@material-ui/core/Grid";
import AddItem from "../components/ShoppingList/AddItem";
import ShoppingListBox from "../components/ShoppingList/ShoppingListBox";

const ShoppingList = () => {
  return (
    <>
      <Grid container direction="column">
        <Grid item container style={{ paddingBottom: 20 }}>
          <Grid item xs={1} sm={2} />
          <Grid item xs={10} sm={10}>
            <AddItem />
          </Grid>
          <Grid item xs={1} sm={false} />
        </Grid>
        <Grid item>
          <ShoppingListBox />
        </Grid>
      </Grid>
    </>
  );
};

export default ShoppingList;
