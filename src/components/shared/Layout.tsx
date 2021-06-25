import { Flex, Box } from "@chakra-ui/react";
import Navigation from "src/components/shared/Navigation";

interface Props {
  children: React.ReactChild;
}

function Layout({ children }: Props) {
  return (
    <Flex direction="column" height="100%" width="100%">
      <Navigation />
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}

export default Layout;
