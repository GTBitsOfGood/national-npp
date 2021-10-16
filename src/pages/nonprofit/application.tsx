import { Flex } from "@chakra-ui/react";
import { FaLastfmSquare } from "react-icons/fa";
import ApplicationCard from "src/components/ApplicationCard";

function NonprofitApplicationPage() {
  return (
    <Flex height="100%" width="100%">
      <Flex margin="auto">
        <ApplicationCard isRead={false} />
      </Flex>
    </Flex>
  );
}

export default NonprofitApplicationPage;
