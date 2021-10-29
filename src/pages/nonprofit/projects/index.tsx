import {
  Flex,
  Stack,
  VStack,
  Heading,
  Link,
  Text,
  Button,
  useDisclosure,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Step, Steps } from "chakra-ui-steps";
import Image from "next/image";
import SubmitApplicationImage from "public/images/nonprofit/project/submit_application.svg";
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { nonprofitGetProjects } from "src/actions/Project";
import EmptyProjectCard from "src/components/nonprofit/projects/EmptyProjectCard";
import ProjectCard from "src/components/nonprofit/projects/ProjectCard";
import StepCard from "src/components/nonprofit/projects/StepCard";
import { getStepCardData } from "src/components/nonprofit/projects/StepCardData";
import ConfirmAlert from "src/components/shared/ConfirmAlert";
import { showError } from "src/utils/notifications";
import {
  displayableProjectStageOrder,
  projectStageToDisplayableProjectStage,
} from "src/utils/stages";
import {
  Chapter,
  DisplayableProjectStage,
  Project,
  User,
} from "src/utils/types";

function NonprofitProjectsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [currProject, setCurrProject] = useState<Project>();
  const [active, setActive] = useState(true);

  const projectChapter = currProject?.chapter as Chapter;
  const chapterContact = projectChapter?.contact as User;
  const projectContact = projectChapter?.contact as User;

  useEffect(() => {
    async function fetchProjects() {
      const projects: Project[] = await nonprofitGetProjects({
        active,
      });

      if (projects.length !== 0 && active) {
        setCurrProject(projects[0]);
      }

      setDisplayedProjects(projects);
    }

    fetchProjects().catch((error: Error) => showError(error.message));
  }, [active]);

  const cancelProject = () => {
    // fill in after backend to update nonprofit project by id is complete
    return;
  };

  return (
    <Flex height="100%" width="100%" overflow="auto">
      <ConfirmAlert
        title="Cancel Project"
        description="Are you sure you want to cancel this project?"
        confirmText="Cancel Project"
        onConfirm={cancelProject}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex
        display={{ base: "none", md: "flex" }}
        direction="column"
        minHeight="700px"
        height="100%"
        width="400px"
        minWidth="300px"
        backgroundColor="surface"
        padding="30px"
      >
        <VStack align="stretch" spacing="20px" overflow="auto">
          <Flex justify="space-between" align="center">
            <Heading fontSize="2xl">Projects</Heading>
            <Link href={"/nonprofit/project/create"}>
              <Button variant="secondary" leftIcon={<BsPlus />}>
                New Project
              </Button>
            </Link>
          </Flex>
          <Tabs colorScheme="blue">
            <TabList>
              <Tab
                _focus={{
                  boxShadow: "none",
                }}
                onClick={() => setActive(true)}
              >
                Active
              </Tab>
              <Tab
                _focus={{
                  boxShadow: "none",
                }}
                onClick={() => setActive(false)}
              >
                Closed
              </Tab>
            </TabList>
            <TabPanels paddingY="20px">
              <TabPanel padding="0px">
                <VStack align="stretch" spacing="20px">
                  {displayedProjects.length !== 0 ? (
                    displayedProjects.map((project) => (
                      <ProjectCard
                        key={project.name}
                        isSelected={currProject?._id == project._id}
                        project={project}
                        onClick={() => setCurrProject(project)}
                      />
                    ))
                  ) : (
                    <EmptyProjectCard active={true} />
                  )}
                </VStack>
              </TabPanel>
              <TabPanel padding="0px">
                <VStack align="stretch" spacing="20px">
                  {displayedProjects.length !== 0 ? (
                    displayedProjects.map((project) => (
                      <ProjectCard
                        key={project.name}
                        isSelected={currProject?._id == project._id}
                        project={project}
                        onClick={() => setCurrProject(project)}
                      />
                    ))
                  ) : (
                    <EmptyProjectCard active={false} />
                  )}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
      <Flex flexBasis="1000px" margin="auto">
        {currProject ? (
          <VStack
            minHeight="700px"
            width="100%"
            align="stretch"
            border="1px solid"
            borderColor="border"
            backgroundColor="surface"
            borderRadius="lg"
            padding="20px"
            margin="20px"
            spacing="20px"
          >
            <Steps
              display={{ base: "none", lg: "flex" }}
              maxHeight="100px"
              activeStep={
                displayableProjectStageOrder[
                  projectStageToDisplayableProjectStage(currProject.status)
                ]
              }
              colorScheme="blue"
              responsive={false}
              paddingX="20px"
            >
              {Object.values(DisplayableProjectStage).map((step) => (
                <Step key={step} label={step} />
              ))}
            </Steps>
            <Stack
              direction={{ base: "column", lg: "row" }}
              flex="1"
              align="stretch"
            >
              <VStack
                flex="1"
                align="start"
                spacing="20px"
                paddingX="20px"
                minWidth="200px"
              >
                <Heading fontSize="3xl">{currProject.name}</Heading>
                <VStack align="start">
                  <Text fontWeight="bold">Chapter Partner</Text>
                  <Text>{projectChapter.name}</Text>
                </VStack>

                {projectContact ? (
                  <VStack align="start">
                    <Text fontWeight="bold">Chapter Contact</Text>
                    <Text>{projectContact.name}</Text>
                    <Text>{projectContact.email}</Text>
                    <Text>{projectContact.phoneNum}</Text>
                  </VStack>
                ) : (
                  <VStack align="start">
                    <Text fontWeight="bold">Chapter Contact</Text>
                    <Text>{chapterContact.name}</Text>
                    <Text>{chapterContact.email}</Text>
                    <Text>{chapterContact.phoneNum}</Text>
                  </VStack>
                )}

                <VStack align="start">
                  <Text fontWeight="bold">Project Type</Text>
                  <Text>{currProject.type}</Text>
                </VStack>
                <Button
                  variant="secondary"
                  color="#657788"
                  onClick={onOpen}
                  padding="0px"
                >
                  Cancel Project
                </Button>
              </VStack>
              <Flex flex="2">
                <StepCard {...getStepCardData(currProject?.status)} />
              </Flex>
            </Stack>
          </VStack>
        ) : (
          <VStack spacing="20px" margin="auto">
            <Image src={SubmitApplicationImage} />
            <Text>Get started on a new project with Hack4Impact!</Text>
            <Link href={"/nonprofit/project/create"}>
              <Button variant="primary">Start a Project</Button>
            </Link>
          </VStack>
        )}
      </Flex>
    </Flex>
  );
}

export default NonprofitProjectsPage;
