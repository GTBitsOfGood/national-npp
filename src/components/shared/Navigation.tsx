import { Flex, Text } from "@chakra-ui/react";

function Navigation() {
  // Assume that you know this information, nav bar changes based on this information
  const isLoggedIn = false;
  const isChapter = false;
  const isNonprofit = false;

  return (
    <Flex height="70px" borderBottom="solid">
      <Text>Navigation</Text>
    </Flex>
  );
}

export default Navigation;
