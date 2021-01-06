import React from "react";
import ShoppingListItem from "./ShoppingListItem";

const ShoppingListTab = (props) => {
  const { shoppingItemsUncomplete, shoppingItemsCompleted, tag } = props;

  return (
    <>
      <ShoppingListItem shoppingItems={shoppingItemsUncomplete} tag={tag} />
      <ShoppingListItem shoppingItems={shoppingItemsCompleted} tag={tag} />
    </>
  );
};

export default ShoppingListTab;
