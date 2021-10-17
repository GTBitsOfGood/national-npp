import { Button, Flex, Heading, HStack, Link, VStack } from "@chakra-ui/react";
import React from "react";
import ApplicationCard from "src/components/ApplicationCard";
import NonprofitInfoCard from "src/components/NonprofitInfoCard";

function ChapterApplicationPage() {
  return (
    <Flex height="100%" width="100%" marginTop={10}>
      <VStack>
        <HStack spacing={1125}>
          <Link color="blue" href="/chapter/projects">
            Nonprofit Applications
          </Link>
          <Button color="#ffffff" bgColor="primary">
            Claim Project
          </Button>
        </HStack>
        <HStack align="start">
          <Flex>
            <NonprofitInfoCard />
          </Flex>
          <Flex>
            <ApplicationCard isRead={true}/>
          </Flex>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default ChapterApplicationPage;
