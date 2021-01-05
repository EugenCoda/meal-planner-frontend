import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";

const ShoppingListTab = (props) => {
  const { markShoppingItemCompleted } = useContext(GlobalContext);
  const { shoppingItemsUncomplete, shoppingItemsCompleted, tag } = props;

  // Capitalize first letter for shopping items
  const capitalizeFirstLetter = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <>
      <FormGroup>
        {shoppingItemsUncomplete.map((item) => (
          <Paper elevation={0} key={item.id} style={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() => markShoppingItemCompleted(item.id)}
                  name={item.name}
                />
              }
              label={capitalizeFirstLetter(item.name)}
            />
            <Typography style={{ padding: "20px 0" }}>
              {" "}
              {" - " + item.quantity + " " + item.sizeOrUnit}
            </Typography>
            {tag && item.category ? (
              <Button color="primary" size="small">
                {item.category}
              </Button>
            ) : null}
          </Paper>
        ))}
      </FormGroup>
      <FormGroup>
        {shoppingItemsCompleted.map((item) => (
          <Paper
            elevation={0}
            key={item.id}
            style={
              item.isCompleted
                ? {
                    textDecoration: "line-through",
                    color: "gray",
                    display: "flex",
                  }
                : null
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() => markShoppingItemCompleted(item.id)}
                  name={item.name}
                />
              }
              label={capitalizeFirstLetter(item.name)}
            />
            <Typography style={{ padding: "20px 0" }}>
              {" "}
              {" - " + item.quantity + " " + item.sizeOrUnit}
            </Typography>
            {tag && item.category ? (
              <Button color="primary" size="small">
                {item.category}
              </Button>
            ) : null}
          </Paper>
        ))}
      </FormGroup>
    </>
  );
};

export default ShoppingListTab;
