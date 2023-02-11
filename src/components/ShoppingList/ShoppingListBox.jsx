import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Box } from "@material-ui/core";
import ShoppingListTab from "./ShoppingListTab";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      minHeight: "24px",
    },
  },
}));

const ShoppingListBox = () => {
  const [shoppingList, setShoppingList] = useState([]);

  // Get items from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "shoppingList"),
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
          setShoppingList(docs);
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Select all uncompleted shopping items
  const shoppingItemsUncompleteFull = shoppingList.filter(
    (item) => !item.isCompleted
  );
  // Select all completed shopping items
  const shoppingItemsCompletedFull = shoppingList.filter(
    (item) => item.isCompleted
  );
  // Select uncompleted shopping items - Fruits & Vegetables
  const shoppingItemsUncompleteFruitsVegetables =
    shoppingItemsUncompleteFull.filter(
      (item) => item.category === "Fruits & Vegetables"
    );
  // Select completed shopping items - Fruits & Vegetables
  const shoppingItemsCompletedFruitsVegetables =
    shoppingItemsCompletedFull.filter(
      (item) => item.category === "Fruits & Vegetables"
    );
  // Select uncompleted shopping items - Bakery
  const shoppingItemsUncompleteBakery = shoppingItemsUncompleteFull.filter(
    (item) => item.category === "Bakery"
  );
  // Select completed shopping items - Bakery
  const shoppingItemsCompletedBakery = shoppingItemsCompletedFull.filter(
    (item) => item.category === "Bakery"
  );
  // Select uncompleted shopping items - Meat & Seafood
  const shoppingItemsUncompleteMeatSeafood = shoppingItemsUncompleteFull.filter(
    (item) => item.category === "Meat & Seafood"
  );
  // Select completed shopping items - Meat & Seafood
  const shoppingItemsCompletedMeatSeafood = shoppingItemsCompletedFull.filter(
    (item) => item.category === "Meat & Seafood"
  );
  // Select uncompleted shopping items - Dairy, Cheese & Eggs
  const shoppingItemsUncompleteDairyCheeseEggs =
    shoppingItemsUncompleteFull.filter(
      (item) => item.category === "Dairy, Cheese & Eggs"
    );
  // Select completed shopping items - Dairy, Cheese & Eggs
  const shoppingItemsCompletedDairyCheeseEggs =
    shoppingItemsCompletedFull.filter(
      (item) => item.category === "Dairy, Cheese & Eggs"
    );
  // Select uncompleted shopping items - Rice, Grains & Beans
  const shoppingItemsUncompleteRiceGrainsBeans =
    shoppingItemsUncompleteFull.filter(
      (item) => item.category === "Rice, Grains & Beans"
    );
  // Select completed shopping items - Rice, Grains & Beans
  const shoppingItemsCompletedRiceGrainsBeans =
    shoppingItemsCompletedFull.filter(
      (item) => item.category === "Rice, Grains & Beans"
    );
  // Select uncompleted shopping items - Oils, Spices etc.
  const shoppingItemsUncompleteOilsSpices = shoppingItemsUncompleteFull.filter(
    (item) => item.category === "Oils, Spices etc."
  );
  // Select completed shopping items - Oils, Spices etc.
  const shoppingItemsCompletedOilsSpices = shoppingItemsCompletedFull.filter(
    (item) => item.category === "Oils, Spices etc."
  );
  // Select uncompleted shopping items - Drinks
  const shoppingItemsUncompleteDrinks = shoppingItemsUncompleteFull.filter(
    (item) => item.category === "Drinks"
  );
  // Select completed shopping items - Drinks
  const shoppingItemsCompletedDrinks = shoppingItemsCompletedFull.filter(
    (item) => item.category === "Drinks"
  );
  // Select uncompleted shopping items - Other
  const shoppingItemsUncompleteOther = shoppingItemsUncompleteFull.filter(
    (item) => item.category === "Other" || item.category === ""
  );
  // Select completed shopping items - Other
  const shoppingItemsCompletedOther = shoppingItemsCompletedFull.filter(
    (item) => item.category === "Other" || item.category === ""
  );
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          className={classes.tab}
          label={`All Items (${shoppingItemsUncompleteFull.length})`}
          {...a11yProps(0)}
        />

        <Tab
          className={classes.tab}
          label={`Fruits & Vegetables (${shoppingItemsUncompleteFruitsVegetables.length})`}
          {...a11yProps(1)}
        />
        <Tab
          className={classes.tab}
          label={`Bakery (${shoppingItemsUncompleteBakery.length})`}
          {...a11yProps(2)}
        />
        <Tab
          className={classes.tab}
          label={`Meat & Seafood (${shoppingItemsUncompleteMeatSeafood.length})`}
          {...a11yProps(3)}
        />
        <Tab
          className={classes.tab}
          label={`Dairy, Cheese & Eggs (${shoppingItemsUncompleteDairyCheeseEggs.length})`}
          {...a11yProps(4)}
        />
        <Tab
          className={classes.tab}
          label={`Rice, Grains & Beans (${shoppingItemsUncompleteRiceGrainsBeans.length})`}
          {...a11yProps(5)}
        />

        <Tab
          className={classes.tab}
          label={`Oils, Spices etc. (${shoppingItemsUncompleteOilsSpices.length})`}
          {...a11yProps(6)}
        />
        <Tab
          className={classes.tab}
          label={`Drinks (${shoppingItemsUncompleteDrinks.length})`}
          {...a11yProps(7)}
        />
        <Tab
          className={classes.tab}
          label={`Other (${shoppingItemsUncompleteOther.length})`}
          {...a11yProps(8)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShoppingListTab
          shoppingItemsUncomplete={shoppingItemsUncompleteFull}
          shoppingItemsCompleted={shoppingItemsCompletedFull}
          tag="full"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShoppingListTab
          shoppingItemsUncomplete={shoppingItemsUncompleteFruitsVegetables}
          shoppingItemsCompleted={shoppingItemsCompletedFruitsVegetables}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ShoppingListTab
          shoppingItemsUncomplete={shoppingItemsUncompleteBakery}
          shoppingItemsCompleted={shoppingItemsCompletedBakery}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ShoppingListTab
          shoppingItemsUncomplete={shoppingItemsUncompleteMeatSeafood}
          shoppingItemsCompleted={shoppingItemsCompletedMeatSeafood}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ShoppingListTab
          shoppingItemsUncomplete={shoppingItemsUncompleteDairyCheeseEggs}
          shoppingItemsCompleted={shoppingItemsCompletedDairyCheeseEggs}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ShoppingListTab
          shoppingItemsUncomplete={shoppingItemsUncompleteRiceGrainsBeans}
          shoppingItemsCompleted={shoppingItemsCompletedRiceGrainsBeans}
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ShoppingListTab
          shoppingItemsUncomplete={shoppingItemsUncompleteOilsSpices}
          shoppingItemsCompleted={shoppingItemsCompletedOilsSpices}
        />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <ShoppingListTab
          shoppingItemsUncomplete={shoppingItemsUncompleteDrinks}
          shoppingItemsCompleted={shoppingItemsCompletedDrinks}
        />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <ShoppingListTab
          shoppingItemsUncomplete={shoppingItemsUncompleteOther}
          shoppingItemsCompleted={shoppingItemsCompletedOther}
        />
      </TabPanel>
    </div>
  );
};

export default ShoppingListBox;
