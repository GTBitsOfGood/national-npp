import { Flex, Text, Box, Heading } from "@chakra-ui/react";

function LandingPage() {
  return (
    <Box>
      <Flex height="100%" justifyContent="center" alignItems="center">
        <Box bg="tomato" w="100%" p={20}>
          <Heading>Non-profit Portal</Heading>
          <Text fontSize="2xl">
            We build software, websites, and mobile apps to turn your ideas into
            real products. If you have an existing project or a team, we are
            happy to get involved in your development cycle.
          </Text>
        </Box>
        <Text fontSize="2xl">Landing Page.</Text>
      </Flex>
    </Box>
  );
}

export default LandingPage;
