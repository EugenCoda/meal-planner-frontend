import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Box, Grid, Typography } from "@material-ui/core";
import SearchBox from "../components/Search/SearchBox";
import { getRecipeCard } from "../utils/getRecipeCard";

const Search = (props) => {
  const { recipes } = useContext(GlobalContext);
  const { history } = props;
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
            <Typography variant="subtitle1" gutterBottom>
              Showing recipes for peanut butter cookies (1-10 out of 26 results)
            </Typography>
            <Grid container spacing={1}>
              {recipes.map((recipe) => getRecipeCard(recipe, history))}
            </Grid>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
