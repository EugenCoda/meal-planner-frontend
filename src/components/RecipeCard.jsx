import React from "react";
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
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

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
  const classes = useStyles();
  const { mealType, recipeName, recipePublisher, recipeURL, imgURL } = props;
  console.log(mealType);
  return (
    <Card className={classes.root}>
      <CardActionArea>
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
        <IconButton
          aria-label="add to favorites"
          className={classes.favoriteButton}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
