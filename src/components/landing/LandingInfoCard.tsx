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
      width="100%"
      justifyContent="center"
      alignItems="center"
      direction={{ base: "column", md: "row" }}
      spacing={{ base: "20px", md: "80px" }}
    >
      <Box>
        <Image src={image} alt={alt} width={250} height={250} />
      </Box>
      <Box width={{ base: "full", md: "40%" }}>
        <Heading fontSize="xl" color="primary" marginBottom="20px">
          {title}
        </Heading>
        <Text>{description}</Text>
      </Box>
    </Stack>
  );
}

export default LandingInfoCard;
