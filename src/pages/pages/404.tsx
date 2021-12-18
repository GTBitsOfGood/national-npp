import { Text, Flex, VStack } from "@chakra-ui/react";
import Image from "next/image";
import mascot from "public/images/mascot.jpg";

export default function Custom404() {
  return (
    <Flex margin="auto">
      <VStack>
        <Text fontSize="xx-large">404 - Page Not Found</Text>
        <Image src={mascot} width={400} height={300} />
      </VStack>
    </Flex>
  );
}
