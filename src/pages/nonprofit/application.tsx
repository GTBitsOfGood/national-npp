import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, VStack, HStack, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import ApplicationCard from "src/components/ApplicationCard";

function NonprofitApplicationPage() {
  // TODO: pass in the current project's id
  const projectId = "616ba502a1667f4a0eadcfa1";

  return (
    <Flex height="100%" width="100%" marginTop={10}>
      <VStack spacing={8} margin="auto" align="start">
        <HStack spacing={12}>
          <Link href="/chapter/projects">
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="blue"
              variant="link"
            >
              <i className="fa fa-angle-left" /> My Projects
            </Button>
          </Link>
          <Heading fontSize="3xl">Application Form</Heading>
        </HStack>
        <Flex margin="auto" paddingX={{ base: "0px", md: "150px" }}>
          <ApplicationCard isRead={false} projectId={projectId} />
        </Flex>
      </VStack>
    </Flex>
  );
}

export default NonprofitApplicationPage;
