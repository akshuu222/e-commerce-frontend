import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";

const CheckOutStep = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      Icon: <LocalShipping />,
    },
    {
      label: <Typography>Confirn Order</Typography>,
      Icon: <LibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      Icon: <AccountBalance />,
    },
  ];

  return (
    <>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{ boxSizing: "border-box" }}
      >
        {steps.map((s, i) => (
          <Step
            key={i}
            active={activeStep === i ? true : false}
            completed={activeStep >= i ? true : false}
          >
            <StepLabel
              sx={{ color: activeStep >= i ? "#088178" : "rgba(0,0,0,0.649)" }}
              icon={s.Icon}
            >
              {s.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckOutStep;
