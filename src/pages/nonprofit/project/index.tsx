import {
  Flex,
  Stack,
  VStack,
  Heading,
  HStack,
  Box,
  Link,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  Tab,
  TabList,
  TabPanels,
} from "@chakra-ui/react";
import { Step, Steps } from "chakra-ui-steps";
import Image from "next/image";
import SubmitApplicationImage from "public/images/nonprofit/project/submit_application.svg";
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { getNonprofitProjects } from "src/actions/Project";
import ProjectCards from "src/components/nonprofit/project/ProjectCards";
import StepCard from "src/components/nonprofit/project/StepCard";
import { getStepCardData } from "src/components/nonprofit/project/StepCardData";
import { chapterStageToDisplayableProjectStage } from "src/utils/stages";
import { Chapter, DisplayableProjectStage, Project } from "src/utils/types";

function NonprofitProjectPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [currProject, setCurrProject] = useState<Partial<Project>>({});
  const [active, setActive] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await getNonprofitProjects(active);
      if (projects.length !== 0 && active) {
        setCurrProject(projects[0]);
      }
      setDisplayedProjects(projects);
    }
    void fetchProjects();
  }, [active]);

  const cancelProject = () => {
    // fill in after backend to update nonprofit project by id is complete
    return;
  };

  return (
    <Flex
      minH="100vh"
      overflow="scroll"
      w="100%"
      justifyContent={{ lg: "center" }}
      bgColor={{ base: "surface", md: "inherit" }}
      direction={{ base: "column", lg: "row" }}
      px={5}
      py={10}
    >
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={{ base: "20rem", md: "35rem" }}>
          <ModalHeader fontSize="2xl">Cancel Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to cancel your project?</Text>
            <Text paddingBottom={3}>
              All of your responses will be permanently deleted.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger" mr={3} onClick={cancelProject}>
              Cancel Project
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* project selection */}
      <Stack
        w={{ base: "full", lg: "33%" }}
        spacing={{ base: "5px", md: "40px" }}
        maxW={{ lg: "md" }}
        mr={{ lg: "20" }}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg">My Projects</Heading>
          <Link href={"/nonprofit/project/create"}>
            <Button
              leftIcon={<BsPlus />}
              variant="ghost"
              color="#0069CA"
              _hover={{ boxShadow: "none" }}
            >
              New Project
            </Button>
          </Link>
        </Flex>
        <Flex display={{ base: "flex", lg: "none" }} direction="column">
          <HStack>
            <Button
              variant="link"
              onClick={() => setActive(true)}
              color={active ? "#0069CA" : "#657788"}
            >
              Active
            </Button>
            <Button
              variant="link"
              onClick={() => setActive(false)}
              color={active ? "#657788" : "#0069CA"}
            >
              Closed
            </Button>
          </HStack>
          <ProjectCards
            mobile={true}
            projects={displayedProjects}
            currProject={currProject}
            setCurrProject={setCurrProject}
          />
        </Flex>
        <Tabs
          display={{ base: "none", lg: "flex" }}
          flexDirection="column"
          variant="unstyled"
          flexGrow={1}
          onChange={(index) => setActive(!index)}
        >
          <TabList borderBottom="1px solid #BCC5D1">
            <Tab
              width={120}
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              border="1px solid none"
              borderBottom="none"
              fontWeight={600}
              _selected={{
                border: "1px solid #BCC5D1",
                borderBottom: "none",
                color: "primary",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              Active
            </Tab>
            <Tab
              width={120}
              height={50}
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              border="1px solid none"
              fontWeight={600}
              _selected={{
                border: "1px solid #BCC5D1",
                borderBottom: "none",
                color: "primary",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              Closed
            </Tab>
          </TabList>

          <TabPanels
            borderBottomLeftRadius={10}
            borderTopRightRadius={10}
            borderBottomRightRadius={10}
            minH="200px"
            overflowX="hidden"
            overflowY="auto"
          >
            <ProjectCards
              mobile={false}
              projects={displayedProjects}
              currProject={currProject}
              setCurrProject={setCurrProject}
            />
          </TabPanels>
        </Tabs>
      </Stack>
      {/* step card */}
      <VStack
        w={{ base: "full", lg: "60%" }}
        flexGrow={1}
        maxW={{ lg: "1250px" }}
        maxH={{ lg: "1000px" }}
      >
        {currProject && Object.keys(currProject).length !== 0 ? (
          <React.Fragment>
            <Steps
              activeStep={Object.values(DisplayableProjectStage).findIndex(
                (stage) =>
                  stage ===
                  chapterStageToDisplayableProjectStage(
                    (currProject as Project).status
                  )
              )}
              colorScheme="blue"
              responsive={false}
              maxH="150px"
              display={{ base: "none", md: "flex" }}
              p={10}
            >
              {Object.values(DisplayableProjectStage).map((step) => (
                <Step key={step} label={step} />
              ))}
            </Steps>
            <Stack
              rounded="lg"
              border={{ base: "none", md: "1px" }}
              borderColor="border"
              bgColor="surface"
              direction={{ base: "column", md: "row" }}
            >
              <Flex direction="column" width={{ md: "40%" }} p={{ md: "5" }}>
                <VStack
                  alignItems="flex-start"
                  maxW="100%"
                  m={{ md: 10 }}
                  spacing={5}
                >
                  <Heading>{currProject.name}</Heading>
                  <Flex
                    direction={{ base: "row", md: "column" }}
                    flexWrap={"wrap"}
                    w="full"
                    align="flex-start"
                  >
                    <Box w={{ base: "50%", md: "full" }} my={{ md: 3 }}>
                      <Text fontWeight="bold">Chapter Partner</Text>
                      <Text>{(currProject.chapter as Chapter).name}</Text>{" "}
                    </Box>
                    <Box w={{ base: "50%", md: "full" }} my={{ md: 3 }}>
                      <Text fontWeight="bold"> Chapter Contact</Text>
                      <Text>{(currProject.chapter as Chapter).email}</Text>
                      <Text>
                        fb @{(currProject.chapter as Chapter).facebook}
                      </Text>
                      <Text>
                        ig @{(currProject.chapter as Chapter).instagram}
                      </Text>
                    </Box>
                    <Box w={{ base: "50%", md: "full" }} my={{ md: 3 }}>
                      <Text fontWeight="bold"> Product Type</Text>
                      <Text>{currProject.type}</Text>
                    </Box>
                  </Flex>
                  <VStack align="flex-start" spacing={0}>
                    <Button
                      variant="secondary"
                      color="#657788"
                      onClick={onOpen}
                      p={0}
                      _hover={{ bgColor: "none" }}
                    >
                      Cancel Project
                    </Button>
                  </VStack>
                </VStack>
              </Flex>
              <Flex minH="600px" w={{ md: "60%" }} pt={{ base: "5", md: "0" }}>
                <StepCard
                  {...getStepCardData((currProject as Project).status)}
                />
              </Flex>
            </Stack>{" "}
          </React.Fragment>
        ) : (
          <Stack
            p={{ md: "5" }}
            rounded="lg"
            border={{ base: "none", md: "1px" }}
            borderColor="border"
            bgColor="surface"
            direction={{ base: "column", md: "row" }}
            h="full"
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={5}>
              <Image src={SubmitApplicationImage} />
              <Text>Get started on a new project with Hack4Impact!</Text>
              <Link href={"/nonprofit/project/create"}>
                <Button color="#0069CA" variant="solid">
                  Start a Project
                </Button>
              </Link>
            </VStack>
          </Stack>
        )}
      </VStack>{" "}
    </Flex>
  );
}

export default NonprofitProjectPage;
