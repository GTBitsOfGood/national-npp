import { Heading, VStack, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode } from "react";

interface StepCardData {
  actionRequired: boolean;
  title: string;
  image: StaticImageData;
  text: string;
  buttons: ReactNode[];
}

const StepCard = ({
  actionRequired,
  text,
  image,
  title,
  buttons,
}: StepCardData) => {
  return (
    <VStack
      w="full"
      justifyContent="center"
      bgColor="#0069CA0D"
      padding="40px"
      spacing="25px"
      borderRadiusRight="lg"
    >
      {actionRequired && (
        <Box color="primary" m="0" bgColor="rgba(0, 105, 202, 0.1)" px="2">
          <Text fontWeight="bold">ACTION REQUIRED</Text>
        </Box>
      )}
      <Heading textAlign="center" fontSize={{ base: "xl", md: "2xl" }}>
        {title}
      </Heading>
      <Box m="4">
        <Image src={image} />
      </Box>
      <Text noOfLines={6} textAlign="center">
        {text}
      </Text>
      <VStack>{buttons}</VStack>
    </VStack>
  );
};

export default StepCard;
