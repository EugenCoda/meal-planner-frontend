import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import ShoppingList from "./pages/ShoppingList";
import Settings from "./pages/Settings";
import Recipe from "./pages/Recipe";
import { Route, Routes, Navigate } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { AuthContext } from "./context/auth/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <GlobalProvider>
      <Grid container direction="column">
        <Grid item style={{ paddingBottom: 40 }}>
          <Header />
        </Grid>
        <Grid item container>
          <Grid item xs={12}>
            <Routes>
              <Route path="/">
                <Route path="/login" element={<Login />} />
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />
                <Route
                  path="search"
                  element={
                    <RequireAuth>
                      <Search />
                    </RequireAuth>
                  }
                />
                <Route
                  path="favorites"
                  element={
                    <RequireAuth>
                      <Favorites />
                    </RequireAuth>
                  }
                />
                <Route
                  path="shopping-list"
                  element={
                    <RequireAuth>
                      <ShoppingList />
                    </RequireAuth>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <RequireAuth>
                      <Settings />
                    </RequireAuth>
                  }
                />
                <Route
                  path="recipe/:recipeID"
                  element={
                    <RequireAuth>
                      <Recipe />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    </GlobalProvider>
  );
}
export default App;
