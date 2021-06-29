import {
  Flex,
  Text,
  Box,
  Heading,
  Button,
  HStack,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import FirstLandingImage from "public/images/landing_first.svg";
import SecondLandingImage from "public/images/landing_second.svg";
import ThirdLandingImage from "public/images/landing_third.svg";

function LandingPage() {
  return (
    <Box>
      <Flex direction="column" justifyContent="center">
        <HStack justifyContent="center">
          <Box bg="white" w="50%" p={10}>
            <Heading fontSize="x-large" marginBottom="1">
              Non-profit Portal
            </Heading>
            <Text fontSize="medium" marginBottom="3">
              We build software, websites, and mobile apps to turn your ideas
              into into real products. If you have an existing project or a
              happy to get involved in your development cycle.
            </Text>
            <Button colorScheme="blue">Log In</Button>
          </Box>
          <Image
            src={FirstLandingImage}
            alt="Build Websites"
            width={250}
            height={250}
          />
        </HStack>
        <HStack justifyContent="center">
          <Image
            src={SecondLandingImage}
            alt="Build Websites"
            width={170}
            height={170}
          />
          <Box w="50%" p={10}>
            <Heading fontSize="large" color="rgb(0,105,202)">
              Start a New Project with us
            </Heading>
            <Text fontSize="small">
              Have a great idea for how a website or mobile application can help
              your nonprofit reach more people? Let us know, and we can build it
              for you!
            </Text>
          </Box>
        </HStack>
        <HStack justifyContent="center">
          <Image
            src={ThirdLandingImage}
            alt="Build Websites"
            width={190}
            height={190}
          />
          <Box w="50%" p={10}>
            <Heading fontSize="large" color="rgb(0,105,202)">
              Project Maintenance
            </Heading>
            <Text fontSize="small">
              Have a completed product for Bits of Good that requires bug fixes
              or maintenance? Let us know, and we can fix it for you!
            </Text>
          </Box>
        </HStack>
        <Divider
          borderColor="grey"
          marginLeft="10"
          marginBottom="5"
          marginRight="10"
        />
        <HStack justifyContent="center" spacing="10">
          <Box>
            <Text fontSize="small">hack4impact</Text>
          </Box>
          <Box>
            <Text fontSize="small">
              Couldn&apos;t find what you&apos;re looking for? Contact us
              through email to get in touch!
            </Text>
            <Text fontSize="small" color="rgb(0,105,202)">
              contact@hack4impact.org
            </Text>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}

export default LandingPage;
