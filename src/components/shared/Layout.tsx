import { Flex } from "@chakra-ui/react";
import Navigation from "src/components/shared/Navigation";

interface Props {
  children: React.ReactChild;
}

function Layout({ children }: Props) {
  return (
    <Flex direction="column" height="100%" width="100%">
      <Navigation />
      <Flex flex="1" overflow="auto">
        {children}
      </Flex>
    </Flex>
  );
}

export default Layout;
