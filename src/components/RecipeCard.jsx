import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Link,
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

const RecipeCard = (props) => {
  const { addToFavorites } = useContext(GlobalContext);
  const classes = useStyles();
  let history = useHistory();
  const {
    id,
    recipeName,
    recipePublisher,
    recipeURL,
    imgURL,
    isFavorite,
  } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push(`/recipe/${id}`)}>
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
        <Link href={recipeURL} target="_blank" color="inherit">
          {recipePublisher}
        </Link>
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
