import ShoppingListItem from "./ShoppingListItem";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebase";

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

  // Remove All Completed Shopping Items
  const handleRemoveAllCompletedItems = async () => {
    const q = query(
      collection(db, "shoppingList"),
      where("isCompleted", "==", true)
    );
    const querySnapshot = await getDocs(q);

    deleteItems(querySnapshot);
  };

  const deleteItems = async (items) => {
    const batch = writeBatch(db);

    items.forEach((item) => {
      batch.delete(item.ref);
    });

    await batch.commit();
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
