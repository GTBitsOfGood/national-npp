import {
  Button,
  Center,
  Flex,
  Divider,
  Heading,
  Text,
  VStack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import RejectedImage from "public/images/nonprofit/project/rejected.svg";
import { useCallback, useEffect, useState } from "react";
import { nonprofitGetIssues } from "src/actions/Issue";
import { nonprofitGetProjects } from "src/actions/Project";
import IssuesTable from "src/components/nonprofit/issues/IssuesTable";
import MaintenanceProjectCard from "src/components/nonprofit/issues/MaintenanceProjectCard";
import EmptyProjectCard from "src/components/shared/EmptyProjectCard";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import PageLoadingIndicator from "src/components/shared/PageLoadingIndicator";
import { dateDiffInDays, dateToMMDDYYYY } from "src/utils/dates";
import { showError } from "src/utils/notifications";
import {
  Issue,
  Chapter,
  Project,
  ProjectStage,
  MaintenanceProject,
} from "src/utils/types";
import urls from "src/utils/urls";

function NonprofitIssuesPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<MaintenanceProject[]>([]);
  const [currProject, setCurrProject] = useState<MaintenanceProject>();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [open, setOpen] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [issuesLoading, setIssuesLoading] = useState(true);

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
        status: ProjectStage.MAINTENANCE,
      });

      const maintenanceProjects: MaintenanceProject[] = projects.map(
        (project) => {
          const projectChapter = project.chapter as Chapter;

          // All projects in maintenance stage will have maintenance start
          const startDate = new Date(project.maintenanceStart as Date);

          const endDate = new Date();
          endDate.setDate(
            startDate.getDate() + projectChapter.maintenancePeriod
          );

          return {
            ...project,
            maintenanceStart: startDate,
            maintenanceEnd: endDate,
            remainingDays: dateDiffInDays(new Date(), endDate),
          };
        }
      );

      setProjects(maintenanceProjects);
    }

    setProjectsLoading(true);
    getProjects()
      .then(() => setProjectsLoading(false))
      .catch((error: Error) => showError(error.message));
  }, []);

  useEffect(() => {
    if (projects.length !== 0) {
      const { projectId } = router.query;

      if (projectId) {
        const selectedProject = projects.find(
          (project) => project._id.toString() == projectId
        );

        if (selectedProject) {
          setCurrProject(selectedProject);
          return;
        }
      }

      switchProject(projects[0]._id.toString());
    }
  }, [projects, router, switchProject]);

  useEffect(() => {
    async function getIssues() {
      if (currProject) {
        const issues: Issue[] = await nonprofitGetIssues(
          currProject._id.toString(),
          { open }
        );

        setIssues(issues);
      }
    }

    if (currProject) {
      setIssuesLoading(true);
      getIssues()
        .then(() => setIssuesLoading(false))
        .catch((error: Error) => showError(error.message));
    }
  }, [currProject, open]);

  return (
    <Flex height="100%" width="100%" overflow="auto">
      {projectsLoading ? (
        <PageLoadingIndicator />
      ) : (
        <>
          <Flex
            display={{ base: "none", lg: "flex" }}
            direction="column"
            alignSelf="stretch"
            height="100%"
            width="400px"
            minWidth="300px"
            backgroundColor="surface"
            padding="30px"
          >
            <VStack align="stretch" spacing="30px">
              <Heading fontSize="lg">Projects Open for Maintenance</Heading>
              <VStack>
                <Divider borderColor="border" />
                {projects?.length !== 0 ? (
                  projects.map((project: MaintenanceProject) => (
                    <MaintenanceProjectCard
                      key={project.name}
                      isSelected={project._id === currProject?._id}
                      project={project}
                      onClick={() => switchProject(project._id.toString())}
                    />
                  ))
                ) : (
                  <EmptyProjectCard />
                )}
              </VStack>
            </VStack>
          </Flex>
          <Flex flexBasis="1000px" margin="auto" paddingX="30px">
            {currProject ? (
              <VStack align="stretch" spacing="20px">
                <Heading fontSize="3xl">{currProject?.name}</Heading>
                <Text>
                  Experiencing issues with your current Hack4Impact product? Are
                  loading times too long, or are your users facing bugs? Let us
                  know and we will contact you soon with an estimated timeline
                  for a fix.
                </Text>
                <VStack
                  width="100%"
                  align="stretch"
                  backgroundColor="surface"
                  padding="15px 30px"
                  borderRadius="lg"
                  spacing="20px"
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="border"
                    paddingY="15px"
                  >
                    {currProject?.maintenanceStart && (
                      <Text fontWeight="bold">
                        {`Maintenance Period: ${dateToMMDDYYYY(
                          currProject.maintenanceStart
                        )} - ${dateToMMDDYYYY(currProject.maintenanceEnd)}`}
                      </Text>
                    )}
                    <Link href={urls.pages.nonprofit.issues.create} passHref>
                      <Button variant="primary">Request Help</Button>
                    </Link>
                  </Flex>
                  <Tabs>
                    <TabList>
                      <Tab
                        _focus={{
                          boxShadow: "none",
                        }}
                        onClick={() => setOpen(true)}
                      >
                        Open Issues
                      </Tab>
                      <Tab
                        _focus={{
                          boxShadow: "none",
                        }}
                        onClick={() => setOpen(false)}
                      >
                        Closed Issues
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel
                        height="450px"
                        padding="15px 0px"
                        overflow="scroll"
                      >
                        {issuesLoading ? (
                          <Center height="100%">
                            <LoadingSpinner />
                          </Center>
                        ) : (
                          <>
                            {issues.length > 0 ? (
                              <IssuesTable issues={issues} />
                            ) : (
                              <Center height="100%">
                                <Text>No Open Issues</Text>
                              </Center>
                            )}
                          </>
                        )}
                      </TabPanel>
                      <TabPanel
                        height="450px"
                        padding="15px 0px"
                        overflow="scroll"
                      >
                        {issuesLoading ? (
                          <Center height="100%">
                            <LoadingSpinner />
                          </Center>
                        ) : (
                          <>
                            {issues.length > 0 ? (
                              <IssuesTable issues={issues} />
                            ) : (
                              <Center height="100%">
                                <Text>No Closed Issues</Text>
                              </Center>
                            )}
                          </>
                        )}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </VStack>
              </VStack>
            ) : (
              <VStack spacing="20px" margin="auto">
                <Image src={RejectedImage} />
                <Text>You have no projects in maintenance yet.</Text>
              </VStack>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default NonprofitIssuesPage;
