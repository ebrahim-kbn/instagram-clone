import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import TelegramIcon from "@material-ui/icons/Telegram";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=350&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=150&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    label: "NeONBRAND Digital Marketing, Las Vegas, United States",
    imgPath:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    display: "block",
    maxWidth: 500,
    overflow: "hidden",
    width: "100%",
    height: 300,
  },
  imgSingle: {
    display: "block",
    maxWidth: 500,
    overflow: "hidden",
    width: "100%",
    objectFit: "contain",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  actions: {
    position: "absolute",
    width: "100%",
    top: "50%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionsButton: {
    backgroundColor: "white",
  },
  stepperNext: {
    flex: 1,
    textAlign: "right",
    paddingRight: 10,
  },
  stepperBack: {
    flex: 1,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
    cursor: "pointer",
  },
}));

function SwipeableMobileStepper({ tutorialSteps }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      {maxSteps >= 2 ? (
        <div className={classes.imageContainer}>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {tutorialSteps.map((step, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <img className={classes.img} src={step} />
                ) : null}
              </div>
            ))}
          </SwipeableViews>
          <div className={classes.actions}>
            <IconButton
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              className={classes.actionsButton}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              className={classes.actionsButton}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </IconButton>
          </div>
        </div>
      ) : (
        <img className={classes.imgSingle} src={tutorialSteps[0]} />
      )}

      <MobileStepper
        steps={maxSteps > 1 ? maxSteps : 0}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <div className={classes.stepperNext}>
            <BookmarkBorderIcon />
          </div>
        }
        backButton={
          <div className={classes.stepperBack}>
            <FavoriteBorderIcon className={classes.icon} />
            <ChatBubbleOutlineOutlinedIcon className={classes.icon} />
            <TelegramIcon className={classes.icon} />
          </div>
        }
      />
    </div>
  );
}

export default SwipeableMobileStepper;
