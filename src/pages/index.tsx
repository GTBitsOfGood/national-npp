import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import FirstLandingImage from "public/images/landing_first.svg";
import SecondLandingImage from "public/images/landing_second.svg";
import ThirdLandingImage from "public/images/landing_third.svg";

function LandingPage() {
  return (
    <Flex height="100%" justifyContent="space-around" alignItems="center">
      <Text fontSize="2xl">Landing Page.</Text>
      <Image
        src={FirstLandingImage}
        alt="Build Websites"
        width={500}
        height={500}
      />
    </Flex>
  );
}

export default LandingPage;
