import odin from '../img/profile/1.jpg'
import dva from '../img/profile/2.jpg'
import tri from '../img/profile/3.jpg'
// import chetiri from '../img/profile/4.jpg'
import shest from '../img/profile/6.jpg'
import sem from '../img/profile/7.jpg'
import finish from '../img/profile/finish.jpg'


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Главная', 'О проекте', 'Возможности', 'Технологии', 'Планы'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <img className="slide" src={odin} alt="slide1" />;
    case 1:
      return <img className="slide" src={dva} alt="slide2" />;
    case 2:
      return <img className="slide" src={tri} alt="slide3" />;
    case 3:
      return <img className="slide" src={shest} alt="slide6" />;
    case 4:
      return <img className="slide" src={sem} alt="slide7" />;
    // case 5:
    //   return <img className="slide" src={sem} alt="slide7" />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className="projectButtons">
            <Typography className={classes.instructions}><img className="slide" src={finish} alt="finish" /></Typography>
            <Button className="yellowButton" onClick={handleReset}>Сбросить</Button>
          </div>
        ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div className="projectButtons">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Назад
              </Button>
                <Button className="purpleButton" variant="contained" color="primary" onClick={handleComplete}>
                  {activeStep === steps.length - 1 ? 'Конец' : 'Далее'}
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
