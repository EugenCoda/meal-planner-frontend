import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Link as MuiLink,
  Typography,
  CardMedia,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 200,
  },
  favoriteButton: {
    marginLeft: "auto",
  },
});

const RecipeCard = ({
  id,
  recipeName,
  recipePublisher,
  recipeURL,
  imgURL,
  isFavorite,
}) => {
  const classes = useStyles();
  let navigate = useNavigate();

  // Items from Global Context
  const { addToFavorites } = useContext(GlobalContext);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => navigate(`/recipe/${id}`)}>
        <CardMedia
          className={classes.media}
          component="img"
          alt={recipeName}
          image={imgURL}
          title={recipeName}
        />
        <CardContent>
          <Typography variant="caption" component="p">
            {recipeName}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        <MuiLink href={recipeURL} target="_blank" color="inherit">
          {recipePublisher}
        </MuiLink>
        <Tooltip
          title={isFavorite ? "Remove From Favorites" : "Add To Favorite"}
          aria-label="favorites"
        >
          <IconButton
            aria-label="add to favorites"
            className={classes.favoriteButton}
            onClick={() => {
              addToFavorites(id);
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
