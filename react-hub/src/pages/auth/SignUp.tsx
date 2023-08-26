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
import React, { useState } from "react";
import BasicInfo from "./steps/BasicInfo";
import College from "./steps/College";
import Social from "./steps/Social";

const steps = {
  "Basic Info": <BasicInfo />,
  College: <College />,
  Social: <Social />,
};

export default function SignUp() {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => setActiveStep(activeStep - 1);
  const handleNext = () => setActiveStep(activeStep + 1);

  const stepWrapper = (component: React.ReactNode) => {
    return (
      <React.Fragment>
        {component}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 3, ml: 1 }}
          >
            {activeStep === Object.keys(steps).length - 1 ? "Register" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    );
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h5" align="center">
          Signing Up for Student Hub
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