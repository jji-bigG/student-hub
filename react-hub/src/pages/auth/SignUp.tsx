import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { createRef, useState } from "react";
import BasicInfo from "./steps/BasicInfo";
import College from "./steps/College";
import Social from "./steps/Social";

export default function SignUp() {
  const [activeStep, setActiveStep] = useState(0);

  const submitRef = createRef<HTMLButtonElement>();

  const steps = {
    "Basic Info": (
      <BasicInfo
        submitRef={submitRef}
        nextStep={() => setActiveStep(activeStep + 1)}
      />
    ),
    College: <College submitRef={submitRef} />,
    Social: <Social submitRef={submitRef} />,
  };

  const handleBack = () => setActiveStep(activeStep - 1);
  const handleNext = () => {
    submitRef.current?.click();
    // TODO: prevent going to the next step if there're issues with entered data or the submission is not finished
    // let the component decide whether to advance to the next step - pass this function into the component
    // setActiveStep(activeStep + 1);
  };

  const stepWrapper = (component: React.ReactNode) => (
    <React.Fragment>
      {component}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
        )}
        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
          {activeStep === Object.keys(steps).length - 1 ? "Register" : "Next"}
        </Button>
      </Box>
    </React.Fragment>
  );

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h5" align="center">
          Sign Up for Student Hub
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {Object.keys(steps).map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === Object.keys(steps).length ? (
          <Typography>Thanks for registering! </Typography>
        ) : (
          stepWrapper(Object.values(steps)[activeStep])
        )}
      </Paper>
    </Container>
  );
}
