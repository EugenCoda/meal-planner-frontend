import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  IconButton,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import RemoveMealButton from "./RemoveMealButton";
import EditMealButton from "./EditMealButton";
const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 50,
    padding: theme.spacing(2),
  },
  media: {
    width: 120,
    height: 120,
  },
  recipeModal: {
    // width: "100%",
    // maxWidth: 400,
    // height: 200,
    // objectFit: "cover",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <Tooltip
          title="Close Window"
          aria-label="meal card"
          placement="bottom-end"
        >
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </MuiDialogTitle>
  );
};

const MealCard = ({ mealType, dailyPlan, selectedDate }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let navigate = useNavigate();

  // Items from Global Context
  const { removeFromDailyPlan } = useContext(GlobalContext);

  const { breakfast, lunch, dinner, snack } = dailyPlan;

  let id, recipeName, imgURL;
  switch (mealType) {
    case "Breakfast":
      id = breakfast.id;
      recipeName = breakfast.recipeName;
      imgURL = breakfast.imgURL;
      break;
    case "Lunch":
      id = lunch.id;
      recipeName = lunch.recipeName;
      imgURL = lunch.imgURL;
      break;
    case "Dinner":
      id = dinner.id;
      recipeName = dinner.recipeName;
      imgURL = dinner.imgURL;
      break;
    default:
      id = snack.id;
      recipeName = snack.recipeName;
      imgURL = snack.imgURL;
      break;
  }

  // Handle Actions for Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  // Close Dialog if clicked away or "X"
  const handleCancel = () => {
    setOpen(false);
  };
  // Remove Meal and Close Dialog if clicked "Remove"
  const handleRemove = () => {
    removeFromDailyPlan(dailyPlan, mealType);
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.media}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            alt={recipeName}
            image={imgURL}
            title={recipeName}
          />
        </CardActionArea>
      </Card>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" onClose={handleCancel}>
          {recipeName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Card className={classes.media}>
              <CardActionArea onClick={() => navigate(`/recipe/${id}`)}>
                <CardMedia
                  className={classes.recipeModal}
                  component="img"
                  alt={recipeName}
                  image={imgURL}
                  title={recipeName}
                />
              </CardActionArea>
            </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <RemoveMealButton handleRemove={handleRemove} />
          <EditMealButton mealType={mealType} selectedDate={selectedDate} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MealCard;
