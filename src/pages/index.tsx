import {
  Text,
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  Divider,
  Stack,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import FirstLandingImage from "public/images/landing_first.svg";
import SecondLandingImage from "public/images/landing_second.svg";
import ThirdLandingImage from "public/images/landing_third.svg";
import FourthLandingImage from "public/images/small_logo.svg";
import LandingInfoCard from "src/components/landing/LandingInfoCard";

// TODO: Add Landing Banner (banner image is messed up right now)
function LandingPage() {
  return (
    <VStack h="100%" p={{ base: 10, md: 0 }} spacing={5}>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction={{ base: "column-reverse", md: "row" }}
        minH={500}
      >
        <VStack
          maxW={{ base: "full", md: "30%" }}
          spacing={5}
          align="flex-start"
          mr={{ base: 0, md: 20 }}
        >
          <Heading
            fontSize={{ base: "x-large", md: "xx-large", lg: "xxx-large" }}
          >
            Non-profit Portal
          </Heading>
          <Text fontSize="medium">
            We build software, websites, and mobile apps to turn your ideas into
            into real products. If you have an existing project or a team, we
            are happy to get involved in your development cycle.
          </Text>
          <NextLink href="/login">
            <Button colorScheme="blue">Log In</Button>
          </NextLink>
        </VStack>
        <Image
          src={FirstLandingImage}
          alt="Building software"
          width={350}
          height={350}
        />
      </Stack>
      <Box align="flex-start" maxW={{ base: "full", md: "80%" }}>
        <LandingInfoCard
          title="Start a New Project with us"
          description="Have a great idea for how a website or mobile application can help
          your nonprofit reach more people? Let us know, and we can build it for
          you!"
          image={SecondLandingImage}
          alt="Starting a project"
        />
        <LandingInfoCard
          title="Project Maintenance"
          description="Have a completed product from a Hack4Impact chapter that requires bug fixes or
            maintenance? Let us know, and we can fix it for you!"
          image={ThirdLandingImage}
          alt="Maintaining a project"
        />
      </Box>
      <Box paddingX={20} w="full">
        <Divider borderColor="grey" />
      </Box>
      <HStack justifyContent="center" spacing={10} w="full">
        <Image
          src={FourthLandingImage}
          alt="Build Websites"
          width={120}
          height={70}
        />
        <Box>
          <Text fontSize="small">
            Couldn&apos;t find what you&apos;re looking for? Contact us through
            email to get in touch!
          </Text>
          <Link
            fontSize="small"
            color="blue.600"
            href="mailto:contact@hack4impact.org"
          >
            contact@hack4impact.org
          </Link>
        </Box>
      </HStack>
    </VStack>
  );
}

export default LandingPage;
