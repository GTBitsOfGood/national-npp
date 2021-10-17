import { Flex, VStack, HStack, Link, Heading } from "@chakra-ui/react";
import { FaLastfmSquare } from "react-icons/fa";
import ApplicationCard from "src/components/ApplicationCard";
import NonprofitInfoCard from "src/components/NonprofitInfoCard";

function NonprofitApplicationPage() {
  return (
    <Flex height="100%" width="100%" marginTop={10}>
      <VStack align="stretch" margin="auto">
        <HStack spacing="90px">
          <Link color="blue" href="/chapter/projects">
            My Projects
          </Link>
          <Heading fontSize="3xl">Application Form</Heading>
        </HStack>
        <Flex paddingLeft="125px">
          <ApplicationCard isRead={false} />
        </Flex>
      </VStack>
    </Flex>
  );
}

export default NonprofitApplicationPage;
