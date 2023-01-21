import React, { useContext } from "react";
import ShoppingListItem from "./ShoppingListItem";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../context/GlobalState";

const useStyles = makeStyles({
  btnStyle: {
    marginTop: "10px",
    marginBottom: "10px",
  },
});

const ShoppingListTab = ({
  shoppingItemsUncomplete,
  shoppingItemsCompleted,
  tag,
}) => {
  const classes = useStyles();

  // Items from Global Context
  const { removeAllCompletedShoppingItems } = useContext(GlobalContext);

  // Remove All Completed Shopping Items
  const handleRemoveAllCompletedItems = () => {
    console.log("removing all items...");
    removeAllCompletedShoppingItems();
  };

  return (
    <>
      <ShoppingListItem shoppingItems={shoppingItemsUncomplete} tag={tag} />
      {shoppingItemsCompleted.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemoveAllCompletedItems}
          className={classes.btnStyle}
        >
          Clear Completed Items
        </Button>
      )}
      <ShoppingListItem shoppingItems={shoppingItemsCompleted} tag={tag} />
    </>
  );
};

export default ShoppingListTab;
