import React from "react";
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import ShoppingList from "./pages/ShoppingList";
import Settings from "./pages/Settings";
import Recipe from "./pages/Recipe";
import { Route, Routes } from "react-router-dom";
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/recipe/:recipeID" element={<Recipe />} />
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    </GlobalProvider>
  );
}
export default App;
