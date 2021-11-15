import { CircularProgress } from "@chakra-ui/react";

function LoadingSpinner() {
  return <CircularProgress isIndeterminate color="primary" thickness="5px" />;
}

export default LoadingSpinner;
