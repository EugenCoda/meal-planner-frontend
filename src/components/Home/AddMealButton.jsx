import React, { useState } from "react";
import { IconButton } from "@material-ui/core";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddMealDialog from "./AddMealDialog";

const AddMealButton = ({ mealType, selectedDate }) => {
  // Handle Actions for Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton aria-label="add meal" onClick={handleClickOpen}>
        {<AddCircleOutlineIcon fontSize="large" />}
      </IconButton>

      <AddMealDialog
        mealType={mealType}
        selectedDate={selectedDate}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default AddMealButton;
