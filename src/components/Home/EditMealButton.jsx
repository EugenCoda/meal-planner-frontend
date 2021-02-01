import React, { useState } from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddMealDialog from "./AddMealDialog";

const EditMealButton = ({ mealType, selectedDate }) => {
  // Handle Actions for Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Tooltip title="Edit Meal Choice" aria-label="meal card" placement="top">
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <AddMealDialog
        mealType={mealType}
        selectedDate={selectedDate}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default EditMealButton;
