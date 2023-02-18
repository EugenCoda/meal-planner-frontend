import React, { useState, useEffect } from "react";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import AddItem from "./AddItem";
import {
  collection,
  onSnapshot,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

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
  ingredientsContainer: {
    padding: "20px",
  },
});

const ExcludedIngredients = () => {
  const classes = useStyles();

  const [ingredients, setIngredients] = useState([]);

  // Get items from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "ingredients"),
      (snapshot) => {
        const docs = [];
        snapshot.docs.forEach((doc) => {
          docs.push(doc.data());
        });
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log("New item: ", change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified item: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed item: ", change.doc.data());
          }
          setIngredients(docs);
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Handle Select Ingredient
  const handleSelectIngredient = async (id) => {
    const q = query(collection(db, "ingredients"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const itemRef = doc(db, "ingredients", querySnapshot.docs[0].id);

    await updateDoc(itemRef, {
      isSelected: !querySnapshot.docs[0].data().isSelected,
    });
  };

  return (
    <Paper className={classes.mainContainer}>
      <Typography variant="h5" className={classes.title}>
        Excluded Ingredients:
      </Typography>
      <Grid container spacing={2} className={classes.ingredientsContainer}>
        {ingredients.map((ingredient) => (
          <Grid item key={ingredient.id}>
            {ingredient.isSelected ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                onClick={() => {
                  handleSelectIngredient(ingredient.id);
                }}
              >
                {ingredient.name}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  handleSelectIngredient(ingredient.id);
                }}
              >
                {ingredient.name}
              </Button>
            )}
          </Grid>
        ))}
        <Grid item>
          <Grid item>
            <AddItem category="ingredient" />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ExcludedIngredients;
