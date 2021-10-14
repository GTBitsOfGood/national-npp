import { Flex } from "@chakra-ui/react";
import ApplicationCard from "src/components/ApplicationCard";

function ChapterApplicationPage() {
  return (
    <Flex height="100%" width="100%">
      <Flex margin="auto">
        {" "}
        <ApplicationCard isRead={true} />
      </Flex>
    </Flex>
  );
}

export default ChapterApplicationPage;
