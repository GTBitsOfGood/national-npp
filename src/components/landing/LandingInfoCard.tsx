import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
}

function LandingInfoCard({ title, description, image, alt }: Props) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction={{ base: "column", md: "row" }}
      spacing={{ base: 0, md: 20 }}
    >
      <Image src={image} alt={alt} width={250} height={250} />
      <Box w={{ base: "full", md: "40%" }}>
        <Heading fontSize="xl" color="blue.500" marginBottom="5">
          {title}
        </Heading>
        <Text fontSize="md">{description}</Text>
      </Box>
    </Stack>
  );
}

export default LandingInfoCard;
