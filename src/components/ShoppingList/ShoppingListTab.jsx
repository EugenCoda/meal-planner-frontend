import React from "react";
import ShoppingListItem from "./ShoppingListItem";

const ShoppingListTab = ({
  shoppingItemsUncomplete,
  shoppingItemsCompleted,
  tag,
}) => {
  return (
    <>
      <ShoppingListItem shoppingItems={shoppingItemsUncomplete} tag={tag} />
      <ShoppingListItem shoppingItems={shoppingItemsCompleted} tag={tag} />
    </>
  );
};

export default ShoppingListTab;
