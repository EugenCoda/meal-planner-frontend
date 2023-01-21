import React from "react";
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import ShoppingList from "./pages/ShoppingList";
import Settings from "./pages/Settings";
import Recipe from "./pages/Recipe";
import { Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Grid container direction="column">
        <Grid item style={{ paddingBottom: 40 }}>
          <Header />
        </Grid>
        <Grid item container>
          <Grid item xs={12}>
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
              <Route
                exact
                path="/recipe/:recipeID"
                render={(props) => <Recipe {...props} />}
              />
            </Switch>
          </Grid>
        </Grid>
      </Grid>
    </GlobalProvider>
  );
}
export default App;
