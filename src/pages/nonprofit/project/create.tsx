import {
  Link,
  HStack,
  Heading,
  Button,
  Box,
  Grid,
  Text,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import ProjectTypeCard from "src/components/nonprofit/project/create/ProjectTypeCard";
import { ProjectType } from "src/utils/types";

function NonprofitProjectCreationPage() {
  const chapter = {
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
  };

  const [selected, setSelected] = useState<ProjectType>();
  function onProjectTypeCardClick(projectType: ProjectType) {
    setSelected(projectType);
  }

  return (
    <Flex
      direction="column"
      justify="space-between"
      padding="60px"
      height="100%"
      width="100%"
      overflow="auto"
    >
      <Box>
        <Heading
          fontSize={{ base: "x-large", md: "xx-large" }}
          marginBottom="50px"
        >
          Start a Project Application
        </Heading>
        <Heading fontSize={{ base: "lg", md: "x-large" }} marginBottom="20px">
          Chapter Partner
        </Heading>
        <HStack spacing="5" marginBottom="70px">
          <Text fontSize={{ base: "medium", md: "large" }}>{chapter.name}</Text>
          <Link href="/chapters">
            <Text fontSize={{ base: "medium", md: "large" }} color="#0069CA">
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
          {chapter.projectTypes.map((projectType) => (
            <ProjectTypeCard
              key={projectType}
              projectType={projectType}
              isSelected={projectType === selected}
              onClick={onProjectTypeCardClick}
            />
          ))}
        </Grid>
        <Heading fontSize={{ base: "lg", md: "x-large" }} marginBottom="20px">
          Give your project a name
        </Heading>
        <Box width={{ base: "300px", md: "600px" }}>
          <Input
            placeholder="Project Name"
            size="md"
            variant="outline"
            backgroundColor="white"
            borderColor="grey"
          />
        </Box>
      </Box>

      <Box align="right" marginTop="40px">
        <Button colorScheme="blue">Get Started</Button>
      </Box>
    </Flex>
  );
}

export default NonprofitProjectCreationPage;
