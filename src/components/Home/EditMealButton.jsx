import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const EditMealButton = ({ handleEdit }) => {
  return (
    <Tooltip title="Edit Meal Choice" aria-label="meal card" placement="top">
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditMealButton;
