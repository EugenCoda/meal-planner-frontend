import React from "react";
import { Grid } from "@material-ui/core";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import ShoppingList from "./pages/ShoppingList";
import Settings from "./pages/Settings";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Grid container direction="column">
        <Grid item style={{ paddingBottom: 40 }}>
          <Header />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10}>
            <Switch>
              <Route exact from="/" render={(props) => <Home {...props} />} />
              <Route
                exact
                path="/search"
                render={(props) => <Search {...props} />}
              />
              <Route
                exact
                path="/favorites"
                render={(props) => <Favorites {...props} />}
              />
              <Route
                exact
                path="/shopping-list"
                render={(props) => <ShoppingList {...props} />}
              />
              <Route
                exact
                path="/settings"
                render={(props) => <Settings {...props} />}
              />
            </Switch>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
