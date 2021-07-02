import {
  Flex,
  Text,
  Box,
  Heading,
  Button,
  HStack,
  Divider,
  Stack,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import FirstLandingImage from "public/images/landing_first.svg";
import SecondLandingImage from "public/images/landing_second.svg";
import ThirdLandingImage from "public/images/landing_third.svg";
import FourthLandingImage from "public/images/small_logo.svg";

function LandingPage() {
  return (
    <Flex direction="column" h="calc(100vh - 100px)">
      <Stack
        justifyContent="center"
        alignItems="center"
        direction={{ base: "column-reverse", md: "row" }}
        marginBottom="10"
        flex="1"
        flexBasis="250px"
      >
        <Box bg="white" w={{ md: "50%" }} p={10}>
          <Heading
            fontSize={{ base: "x-large", md: "xx-large", lg: "xxx-large" }}
            marginBottom="1"
          >
            Non-profit Portal
          </Heading>
          <Text fontSize="medium" marginY="5" maxW={500}>
            We build software, websites, and mobile apps to turn your ideas into
            into real products. If you have an existing project or a happy to
            get involved in your development cycle.
          </Text>
          <Button colorScheme="blue">Log In</Button>
        </Box>
        <Image
          src={FirstLandingImage}
          alt="Build Websites"
          width={250}
          height={250}
        />
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction={{ base: "column", md: "row" }}
        marginBottom="10"
        flex="1"
      >
        <Image
          src={SecondLandingImage}
          alt="Build Websites"
          width={190}
          height={190}
        />
        <Box w={{ md: "50%" }} p={10} marginLeft={{ md: "20" }}>
          <Heading
            fontSize={{ base: "large", md: "x-large" }}
            color="rgb(0,105,202)"
            marginBottom="5"
          >
            Start a New Project with us
          </Heading>
          <Text fontSize={{ base: "small", md: "medium" }}>
            Have a great idea for how a website or mobile application can help
            your nonprofit reach more people? Let us know, and we can build it
            for you!
          </Text>
        </Box>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction={{ base: "column", md: "row" }}
        flex="1"
      >
        <Image
          src={ThirdLandingImage}
          alt="Build Websites"
          width={190}
          height={190}
        />
        <Box w={{ md: "50%" }} p={10}>
          <Heading
            fontSize={{ base: "large", md: "x-large" }}
            color="rgb(0,105,202)"
            marginBottom="5"
          >
            Project Maintenance
          </Heading>
          <Text fontSize={{ base: "small", md: "medium" }}>
            Have a completed product for Bits of Good that requires bug fixes or
            maintenance? Let us know, and we can fix it for you!
          </Text>
        </Box>
      </Stack>
      <Box marginX="7" marginBottom="5">
        <Divider borderColor="grey" />
      </Box>
      <HStack justifyContent="center" spacing="10">
        <Box justifyContent="center">
          <Image
            src={FourthLandingImage}
            alt="Build Websites"
            width={120}
            height={120}
          />
        </Box>
        <Box w="50%">
          <Text fontSize="small">
            Couldn&apos;t find what you&apos;re looking for? Contact us through
            email to get in touch!
          </Text>
          <Link
            fontSize="small"
            color="rgb(0,105,202)"
            href="mailto:contact@hack4impact.org"
          >
            contact@hack4impact.org
          </Link>
        </Box>
      </HStack>
    </Flex>
  );
}

export default LandingPage;
