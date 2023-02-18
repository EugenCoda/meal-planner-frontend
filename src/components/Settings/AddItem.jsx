import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// Unique ID Generator
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const AddItem = ({ category }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Handle Add Item
  const handleAddItem = (category) => {
    setIsAdding(true);
  };

  // Handle Save Item
  const handleSaveItem = async (e) => {
    e.preventDefault();
    setIsAdding(false);
    try {
      // Adding item ID and date added
      let additionalInfo = {
        id: uuidv4(),
        timeStamp: serverTimestamp(),
        isSelected: false,
      };
      const newValues = { name: inputValue, ...additionalInfo };

      // Saving to Firestore
      const docRef = await addDoc(
        collection(db, getCollectionName(category)),
        newValues
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      // Error saving to Firestore
      console.error("Error adding document: ", error);
    }

    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getCollectionName = (category) => {
    // eslint-disable-next-line default-case
    switch (category) {
      case "diet":
        return "diets";
      case "ingredient":
        return "ingredients";
      case "allergy":
        return "allergies";
    }
  };

  return (
    <>
      {isAdding ? (
        <Box component="form" onSubmit={handleSaveItem}>
          <TextField
            id="outlined-basic"
            label={capitalizeFirstLetter(category)}
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={inputValue === ""}
          >
            <CheckIcon />
          </Button>
          <Button variant="contained" onClick={() => setIsAdding(false)}>
            <HighlightOffIcon />
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            handleAddItem(category);
          }}
        >
          <AddIcon />
        </Button>
      )}
    </>
  );
};

export default AddItem;
