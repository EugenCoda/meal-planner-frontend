import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const RemoveMealButton = ({ handleRemove }) => {
  return (
    <Tooltip
      title="Remove From Meal Plan"
      aria-label="meal card"
      placement="top"
    >
      <IconButton onClick={handleRemove}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveMealButton;
