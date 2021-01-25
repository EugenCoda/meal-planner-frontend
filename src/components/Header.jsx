import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  MenuItem,
  Menu,
  useMediaQuery,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly",
  },
  headerItemStyles: {
    minWidth: "fit-content",
    maxWidth: 80,
  },
}));

const Header = () => {
  let history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      menuTitle: "Search Recipe",
      pageURL: "/search",
    },
    {
      menuTitle: "Favorites",
      pageURL: "/favorites",
    },
    {
      menuTitle: "Shopping List",
      pageURL: "/shopping-list",
    },
    {
      menuTitle: "Settings",
      pageURL: "/settings",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <List className={classes.headerOptions}>
            <ListItem
              button
              onClick={() => handleButtonClick("/")}
              to="/"
              className={classes.title}
            >
              <ListItemText primary="Meal Planner" />
            </ListItem>
          </List>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map((menuItem, index) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => handleMenuClick(pageURL)}
                      className={classes.headerItemStyles}
                    >
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : (
            <>
              <List className={classes.headerOptions}>
                {menuItems.map((menuItem, index) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleButtonClick(pageURL)}
                      className={classes.headerItemStyles}
                    >
                      {menuTitle}
                    </ListItem>
                  );
                })}
              </List>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
