import { Heading, Button, VStack, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { MouseEventHandler } from "react";

// Image/Graphic Logic

interface StepCardData {
  actionRequired: boolean;
  image: StaticImageData;
  title: string;
  text: string;
  buttonText?: string;
  buttonCallback?: MouseEventHandler;
}

const StepCard = ({
  actionRequired,
  text,
  image,
  title,
  buttonText,
  buttonCallback,
}: StepCardData) => {
  return (
    <VStack
      bgColor="#0069CA0D"
      p="10"
      maxW="100%"
      justifyContent="center"
      spacing="25px"
    >
      {actionRequired && (
        <Box color="#0069CA" m="0" bgColor="rgba(0, 105, 202, 0.1)" px="2">
          <Text>Action Required</Text>
        </Box>
      )}
      <Heading m="3">{title}</Heading>
      <Box m="4">
        <Image src={image} />
      </Box>
      <Text noOfLines={{ base: 3, md: 6 }}>{text}</Text>
      {buttonText && buttonCallback && (
        <Button onClick={buttonCallback} bgColor="#0069CA" color="white">
          {buttonText}
        </Button>
      )}
    </VStack>
  );
};

export default StepCard;
