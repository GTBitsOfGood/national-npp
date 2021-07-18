import { Stack, StackProps } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";

interface Props extends StackProps {
  steps: { label: string }[];
  currStep: number;
}

interface RestProps {}

function ProgressBar({ steps, currStep, ...restProps }: Props & RestProps) {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: currStep,
  });

  return (
    <Stack {...restProps}>
      <Steps activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step label={label} key={label} />
        ))}
      </Steps>
    </Stack>
  );
}

export default ProgressBar;
