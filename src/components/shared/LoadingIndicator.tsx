import { Progress } from "@chakra-ui/react";

function LoadingIndicator() {
  return <Progress size="xs" width="100%" colorScheme="blue" isIndeterminate />;
}

export default LoadingIndicator;
