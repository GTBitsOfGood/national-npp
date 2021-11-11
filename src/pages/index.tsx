import {
  Text,
  Box,
  Flex,
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
import FirstLandingImage from "public/images/landing/landing_first.svg";
import SecondLandingImage from "public/images/landing/landing_second.svg";
import ThirdLandingImage from "public/images/landing/landing_third.svg";
import FourthLandingImage from "public/images/small_logo.svg";
import LandingInfoCard from "src/components/landing/LandingInfoCard";
import urls from "src/utils/urls";

function LandingPage() {
  return (
    <Flex
      direction="column"
      justify="space-between"
      height="100%"
      width="100%"
      backgroundColor="surface"
      overflow="auto"
    >
      <Stack
        backgroundColor="#E6F7FF"
        justifyContent="center"
        alignItems="center"
        direction={{ base: "column-reverse", md: "row" }}
        padding="80px 40px"
      >
        <VStack
          maxW={{ base: "100%", md: "30%" }}
          spacing="20px"
          align="flex-start"
          mr={{ base: "0px", md: "60px" }}
          mt={{ base: "20px", md: "0px" }}
        >
          <Heading
            fontSize={{ base: "x-large", md: "xx-large", lg: "xxx-large" }}
          >
            Nonprofit Portal
          </Heading>
          <Text fontSize="medium">
            We build software, websites, and mobile apps to turn your ideas into
            into real products. If you have an existing project or a team, we
            are happy to get involved in your development cycle.
          </Text>
          <NextLink href={urls.pages.login}>
            <Button variant="primary">Log In</Button>
          </NextLink>
        </VStack>
        <Box>
          <Image
            src={FirstLandingImage}
            alt="Building software"
            width={380}
            height={380}
          />
        </Box>
      </Stack>
      <VStack align="center" marginX="auto" padding="60px 40px" spacing="20px">
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
      </VStack>
      <Box>
        <Box paddingX="20px" width="100%">
          <Divider borderColor="border" />
        </Box>
        <HStack justifyContent="center" spacing="40px" padding="20px 40px">
          <Image
            src={FourthLandingImage}
            alt="Build Websites"
            width={120}
            height={80}
          />
          <Box>
            <Text fontSize="sm">
              Couldn&apos;t find what you&apos;re looking for? Contact us
              through email to get in touch!
            </Text>
            <Link
              fontSize="sm"
              color="primary"
              href="mailto:contact@hack4impact.org"
            >
              contact@hack4impact.org
            </Link>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
}

export default LandingPage;
