import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
}));

const ShoppingList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });

  const handleTick = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
        <Tab label="Fruits & Vegetables" {...a11yProps(0)} />
        <Tab label="Bakery" {...a11yProps(1)} />
        <Tab label="Meat & Seafood" {...a11yProps(2)} />
        <Tab label="Dairy, Cheese & Eggs" {...a11yProps(3)} />
        <Tab label="Rice, Grains & Beans" {...a11yProps(4)} />
        <Tab label="Oils, Spices etc." {...a11yProps(5)} />
        <Tab label="Add Other Items" {...a11yProps(6)} />
        <Tab label="See Full List" {...a11yProps(7)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ul>
          <li>Avocados - 6</li>
          <li>Garlic - 4 cloves</li>
          <li>Carrots - 3 medium</li>
          <li>Red Onions - 1 small</li>
          <li>
            <TextField id="standard-search" label="Add item" type="search" />
          </li>
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedA}
                onChange={handleTick}
                name="checkedA"
              />
            }
            label="Bread"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleTick}
                name="checkedB"
              />
            }
            label="Croissants"
          />
        </FormGroup>
        <TextField id="standard-search" label="Add item" type="search" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      <TabPanel value={value} index={7}>
        Item Eight
      </TabPanel>
    </div>
  );
};

export default ShoppingList;
