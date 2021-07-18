import { Heading, VStack, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode } from "react";

// Image/Graphic Logic

interface StepCardData {
  actionRequired: boolean;
  image: StaticImageData;
  title: string;
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
      bgColor="#0069CA0D"
      p="10"
      w="100%"
      justifyContent="center"
      spacing="25px"
    >
      {actionRequired && (
        <Box color="#0069CA" m="0" bgColor="rgba(0, 105, 202, 0.1)" px="2">
          <Text fontWeight="bold">ACTION REQUIRED</Text>
        </Box>
      )}
      <Heading m="3" as="h3" fontSize={{ base: "20px", md: "25px" }}>
        {title}
      </Heading>
      <Box m="4">
        <Image src={image} />
      </Box>
      <Text noOfLines={{ base: 2, md: 4, lg: 6 }}>{text}</Text>
      {buttons}
    </VStack>
  );
};

export default StepCard;
