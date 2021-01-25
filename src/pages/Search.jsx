import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { Box, Grid } from "@material-ui/core";
import SearchBox from "../components/Search/SearchBox";
import { getRecipeCard } from "../utils/getRecipeCard";

const Search = () => {
  let history = useHistory();

  // Items from Global Context
  const { recipes, searchFilter } = useContext(GlobalContext);

  return (
    <Box>
      <Grid container>
        <Grid item container style={{ paddingBottom: 20 }}>
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10}>
            <SearchBox />
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10}>
            <Grid item container spacing={1}>
              {recipes.map((recipe) => {
                return (
                  recipe.recipeName
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase()) &&
                  getRecipeCard(recipe, history)
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
