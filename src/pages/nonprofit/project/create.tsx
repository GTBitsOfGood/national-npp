import {
  Link,
  HStack,
  Heading,
  Button,
  Box,
  Grid,
  Text,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import ProjectTypeCard from "src/components/ProjectTypeCard";
import { ProjectType } from "src/utils/types";

function NonprofitProjectCreationPage() {
  const chapters = [
    {
      _id: `1`,
      name: "Georgia Tech",
      email: "gt@hack4impact.org",
      address: {
        street: "7 Fake Street",
        city: "Atlanta",
        state: "GA",
        zipCode: "30303",
        country: "USA",
      },
      projectProcess: [],
      projectTypes: [ProjectType.WEBSITE, ProjectType.MOBILE_APP],
      projectLimit: 5,
      website: "bitsofgood.org",
      facebook: "bitsofgood",
      instagram: "bitsofgood",
    },
  ];


  return (
    <Box height="100%" backgroundColor="#EBEEF1" overflow="auto">
      <Box
        boxSizing="border-box"
        padding="50px"
        maxWidth="1420px"
        margin="auto"
      >
        <Heading
          fontSize={{ base: "x-large", md: "xx-large" }}
          marginBottom="50px"
        >
          Start a Project Application
        </Heading>
        <Heading fontSize={{ base: "lg", md: "x-large" }} marginBottom="20px">
          Chapter Partner
        </Heading>
        <HStack spacing="5" marginBottom="100px">
          <Text fontSize={{ base: "medium", md: "large" }}>Chapter Name</Text>
          <Link href="/chapters">
            <Text fontSize={{ base: "medium", md: "large" }} color="#0069CA">
              {" "}
              Change
            </Text>
          </Link>
        </HStack>
        <Heading fontSize={{ base: "lg", md: "x-large" }} marginBottom="20px">
          Select a project type
        </Heading>
        <Grid
          gridTemplateColumns="repeat(auto-fill, 400px)"
          columnGap="60px"
          rowGap="40px"
          marginBottom="70px"
        >
        </Grid>
        <Heading fontSize={{ base: "lg", md: "x-large" }} marginBottom="20px">
          Give your project a name
        </Heading>
        <Box width={{ base: "300px", md: "600px" }}>
          <Input
            placeholder="Text Here"
            size="md"
            variant="outline"
            backgroundColor="white"
            borderColor="grey"
          />
        </Box>

        <Box align="right" marginTop="40px">
          <Button px="25px" colorScheme="blue">
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default NonprofitProjectCreationPage;
