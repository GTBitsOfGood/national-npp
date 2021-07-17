import { Flex, Text, Stack } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";



function ProgressBar() {
  const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Stack width="60%">
      <Steps activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step label={label} key={label} />
        ))}
      </Steps>
    </Stack>
  );
}

export default ProgressBar;
