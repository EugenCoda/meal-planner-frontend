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
  allergiesContainer: {
    padding: "20px",
  },
});

const Intolerances = () => {
  const classes = useStyles();

  const [allergies, setAllergies] = useState([]);

  // Get items from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "allergies"), (snapshot) => {
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
        setAllergies(docs);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Handle Select Allergy
  const handleSelectAllergy = async (id) => {
    const q = query(collection(db, "allergies"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const itemRef = doc(db, "allergies", querySnapshot.docs[0].id);

    await updateDoc(itemRef, {
      isSelected: !querySnapshot.docs[0].data().isSelected,
    });
  };

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
                  handleSelectAllergy(allergy.id);
                }}
              >
                {allergy.name}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  handleSelectAllergy(allergy.id);
                }}
              >
                {allergy.name}
              </Button>
            )}
          </Grid>
        ))}
        <Grid item>
          <AddItem category="allergy" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Intolerances;
