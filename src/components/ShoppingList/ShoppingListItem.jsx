import clsx from "clsx";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  // useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip, IconButton } from "@material-ui/core";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  lineItem: {
    display: "flex",
    height: "35px",
  },
  lineItemText: {
    [theme.breakpoints.down("lg")]: {
      padding: "6px 0",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem",
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

const ShoppingListItem = ({ shoppingItems, tag }) => {
  const classes = useStyles();
  // const theme = useTheme();

  // Update Mark Completed
  const handleMarkCompleted = async (id) => {
    const q = query(collection(db, "shoppingList"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const itemRef = doc(db, "shoppingList", querySnapshot.docs[0].id);

    await updateDoc(itemRef, {
      isCompleted: !querySnapshot.docs[0].data().isCompleted,
    });
  };

  // Remove Completed Shopping Item
  const handleRemoveItem = async (id) => {
    const q = query(collection(db, "shoppingList"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    await deleteDoc(doc(db, "shoppingList", querySnapshot.docs[0].id));
  };

  return (
    <>
      <FormGroup>
        {shoppingItems.map((item) => (
          <Paper
            elevation={0}
            key={item.id}
            className={classes.lineItem}
            style={
              item.isCompleted
                ? {
                    textDecoration: "line-through",
                    color: "gray",
                  }
                : null
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isCompleted}
                  onChange={() => handleMarkCompleted(item.id)}
                  name={item.name}
                  checkedIcon={
                    <span className={clsx(classes.icon, classes.checkedIcon)} />
                  }
                  icon={<span className={classes.icon} />}
                />
              }
              label={capitalizeFirstLetter(item.name)}
              style={{ marginRight: "5px" }}
            />
            <Typography className={classes.lineItemText}>
              {" - " + item.quantity + " " + item.sizeOrUnit}
            </Typography>
            {item.isCompleted && (
              <Tooltip
                title="Remove From Shopping List"
                aria-label="shopping item"
                placement="top"
              >
                <IconButton onClick={() => handleRemoveItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Paper>
        ))}
      </FormGroup>
    </>
  );
};

export default ShoppingListItem;
