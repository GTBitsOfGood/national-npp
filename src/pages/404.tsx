import { Text, Flex, VStack } from "@chakra-ui/react";
import Image from "next/image";
import mascot from "public/images/mascot.jpg";

function Custom404() {
  return (
    <Flex height="100%" width="100%" backgroundColor="surface" overflow="auto">
      <Flex margin="auto" padding="40px">
        <VStack align="stretch">
          <Text textAlign="center" fontSize="2xl">
            404 - Page Not Found
          </Text>
          <Image src={mascot} width={400} height={300} />
        </VStack>
      </Flex>
    </Flex>
  );
}

export default Custom404;
