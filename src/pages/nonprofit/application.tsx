import { Flex, VStack, HStack, Link, Heading } from "@chakra-ui/react";
import ApplicationCard from "src/components/ApplicationCard";

function NonprofitApplicationPage() {
  // TODO: pass in the current project's id
  const projectId = "616ba502a1667f4a0eadcfa1";

  return (
    <Flex height="100%" width="100%" marginTop={10}>
      <VStack align="stretch" margin="auto">
        <HStack spacing="90px">
          <Link color="blue" href="/chapter/projects">
            My Projects
          </Link>
          <Heading fontSize="3xl">Application Form</Heading>
        </HStack>
        <Flex paddingX={{ base: "0px", md: "100px" }}>
          <ApplicationCard isRead={false} projectId={projectId} />
        </Flex>
      </VStack>
    </Flex>
  );
}

export default NonprofitApplicationPage;
