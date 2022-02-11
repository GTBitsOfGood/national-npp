import {
  Flex,
  Stack,
  VStack,
  Heading,
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
import Link from "next/link";
import { useRouter } from "next/router";
import RejectedImage from "public/images/nonprofit/project/rejected.svg";
import React, { useCallback, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import {
  nonprofitGetProjects,
  nonprofitUpdateProject,
} from "src/actions/Project";
import ProjectCard from "src/components/nonprofit/projects/ProjectCard";
import StepCard from "src/components/nonprofit/projects/StepCard";
import { getStepCardData } from "src/components/nonprofit/projects/StepCardData";
import ConfirmAlert from "src/components/shared/ConfirmAlert";
import EmptyProjectCard from "src/components/shared/EmptyProjectCard";
import PageLoadingIndicator from "src/components/shared/PageLoadingIndicator";
import { showError } from "src/utils/notifications";
import {
  displayableProjectStageOrder,
  projectStageToDisplayableProjectStage,
} from "src/utils/stages";
import {
  Chapter,
  DisplayableProjectStage,
  Project,
  ProjectStage,
  StepCardEvent,
  User,
} from "src/utils/types";
import urls from "src/utils/urls";

function NonprofitProjectsPage() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [currProject, setCurrProject] = useState<Project>();
  const [active, setActive] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const projectChapter = currProject?.chapter as Chapter;
  const chapterContact = projectChapter?.contact as User;
  const projectContact = projectChapter?.contact as User;

  const switchProject = useCallback(
    (projectId: string) => {
      router
        .push(`?projectId=${projectId}`, undefined, {
          shallow: true,
        })
        .catch((error: Error) => showError(error.message));
    },
    [router]
  );

  useEffect(() => {
    async function getProjects() {
      const projects: Project[] = await nonprofitGetProjects({
        filters: { status: { $active: active, type: "$active" } },
      });

      setDisplayedProjects(projects);
    }

    setCurrProject(undefined);
    setLoading(true);
    getProjects()
      .then(() => setLoading(false))
      .catch((error: Error) => showError(error.message));
  }, [active]);

  useEffect(() => {
    if (displayedProjects.length !== 0) {
      const { projectId } = router.query;

      if (projectId) {
        const selectedProject = displayedProjects.find(
          (project) => project._id.toString() == projectId
        );

        if (selectedProject) {
          setCurrProject(selectedProject);
          return;
        }
      }

      switchProject(displayedProjects[0]._id.toString());
    }
  }, [router, displayedProjects, switchProject]);

  const cancelProject = async () => {
    const projectId = router.query.projectId as string;

    try {
      await nonprofitUpdateProject(projectId, {
        status: ProjectStage.CANCELLED,
      });

      router.reload();
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }
  };

  const handleEvent = async (event: StepCardEvent) => {
    const projectId = router.query.projectId as string;

    if (event === StepCardEvent.APPLICATION_FORM) {
      await router.push(
        urls.pages.nonprofit.projects.index +
          `/${projectId}` +
          "/application/create"
      );
    }
  };

  return (
    <Flex height="100%" width="100%">
      {isLoading ? (
        <PageLoadingIndicator />
      ) : (
        <>
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
                <Link href={urls.pages.nonprofit.projects.create} passHref>
                  <Button variant="secondary" leftIcon={<BsPlus />}>
                    New Project
                  </Button>
                </Link>
              </Flex>
              <Tabs colorScheme="blue" defaultIndex={active ? 0 : 1}>
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
                            onClick={() =>
                              switchProject(project._id.toString())
                            }
                          />
                        ))
                      ) : (
                        <EmptyProjectCard />
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
                            onClick={() =>
                              switchProject(project._id.toString())
                            }
                          />
                        ))
                      ) : (
                        <EmptyProjectCard />
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
                  border="1px solid"
                  borderColor="border"
                  borderRadius="lg"
                  backgroundColor="surface"
                >
                  <Flex
                    flex="1"
                    minWidth="200px"
                    direction="column"
                    justify="space-between"
                    padding="40px"
                    align="flex-start"
                  >
                    <VStack align="start" spacing="20px">
                      <Heading fontSize="3xl" marginBottom="30px">
                        {currProject.name}
                      </Heading>
                      {projectChapter && (
                        <VStack align="start">
                          <Text fontWeight="bold">Chapter Partner</Text>
                          <Text>{projectChapter.name}</Text>
                        </VStack>
                      )}

                      {projectContact && (
                        <VStack align="start">
                          <Text fontWeight="bold">Project Contact</Text>
                          <Text>{projectContact.name}</Text>
                          <Text>{projectContact.email}</Text>
                          <Text>{projectContact.phoneNum}</Text>
                        </VStack>
                      )}

                      {!projectContact && chapterContact && (
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
                    </VStack>
                    {active && (
                      <Button
                        variant="secondary"
                        color="secondaryText"
                        textDecoration="underline"
                        onClick={onOpen}
                        padding="0px"
                        _focus={{
                          boxShadow: "none",
                        }}
                        marginTop="20px"
                      >
                        Cancel Project
                      </Button>
                    )}
                  </Flex>
                  <Flex flex="2">
                    <StepCard
                      {...getStepCardData({
                        projectStage: currProject?.status,
                        onEvent: handleEvent,
                      })}
                    />
                  </Flex>
                </Stack>
              </VStack>
            ) : (
              <VStack spacing="20px" margin="auto">
                <Image src={RejectedImage} />
                <Text>Get started on a new project with Hack4Impact!</Text>
                <Link href={urls.pages.nonprofit.projects.create} passHref>
                  <Button variant="primary">Start a Project</Button>
                </Link>
              </VStack>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default NonprofitProjectsPage;
