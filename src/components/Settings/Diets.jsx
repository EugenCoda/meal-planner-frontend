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
  dietsContainer: {
    padding: "20px",
  },
});

const Diets = () => {
  const classes = useStyles();

  const [diets, setDiets] = useState([]);

  // Get items from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "diets"), (snapshot) => {
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
        setDiets(docs);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Handle Select Diet
  const handleSelectDiet = async (id) => {
    const q = query(collection(db, "diets"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const itemRef = doc(db, "diets", querySnapshot.docs[0].id);

    await updateDoc(itemRef, {
      isSelected: !querySnapshot.docs[0].data().isSelected,
    });
  };

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
                  handleSelectDiet(diet.id);
                }}
              >
                {diet.name}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  handleSelectDiet(diet.id);
                }}
              >
                {diet.name}
              </Button>
            )}
          </Grid>
        ))}
        <Grid item>
          <AddItem category="diet" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Diets;
