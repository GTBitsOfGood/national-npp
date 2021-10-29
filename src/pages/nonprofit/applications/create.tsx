import { Flex, VStack, HStack, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import ApplicationCard from "src/components/shared/ApplicationCard";
import urls from "src/utils/urls";

function NonprofitApplicationPage() {
  // TODO: Pass current project's id
  const projectId = "616ba502a1667f4a0eadcfa1";

  return (
    <Flex
      height="100%"
      width="100%"
      padding={{ base: "40px 0px", md: "40px 20px" }}
    >
      <VStack spacing={8} margin="auto" align="start">
        <HStack spacing="30px">
          <Link href={urls.pages.nonprofit.projects.index} passHref={true}>
            <Button leftIcon={<IoIosArrowRoundBack />} variant="secondary">
              My Projects
            </Button>
          </Link>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Application Form
          </Heading>
        </HStack>
        <Flex paddingX={{ base: "0px", md: "150px" }}>
          <ApplicationCard isRead={false} projectId={projectId} />
        </Flex>
      </VStack>
    </Flex>
  );
}

export default NonprofitApplicationPage;
