import {
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { nonprofitGetIssues, nonprofitGetProjects } from "src/actions/Project";
import IssuesTable from "src/components/nonprofit/issues/IssuesTable";
import MaintenanceProjectCard from "src/components/nonprofit/issues/MaintenanceProjectCard";
import LoadingIndicator from "src/components/shared/LoadingIndicator";
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

          const endDate = new Date(
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
        <LoadingIndicator />
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
            <VStack align="stretch">
              <Heading fontSize={{ base: "md", md: "lg" }}>
                Projects Open for Maintenance
              </Heading>
              <VStack>
                {projects?.map((project: MaintenanceProject) => (
                  <MaintenanceProjectCard
                    remainingDays={project.remainingDays}
                    key={project.name}
                    isSelected={project._id === currProject?._id}
                    project={project}
                    onClick={() => setCurrProject(project)}
                  />
                ))}
              </VStack>
            </VStack>
          </Flex>
          <Flex flexBasis="1000px" margin="auto" paddingX="30px">
            <VStack align="stretch" spacing="20px">
              <Heading>Maintenance for {currProject?.name}</Heading>
              <Text>
                Experiencing issues with your current Hack4Impact product? Are
                loading times too long, or are your users facing bugs? Let us
                know and we will contact you soon with an estimated timeline for
                a fix.
              </Text>
              <VStack
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
                  <Text fontWeight="bold">
                    Maintenance Period:{" "}
                    {currProject?.maintenanceStart &&
                      dateToMMDDYYYY(
                        new Date(currProject.maintenanceStart)
                      )}{" "}
                    -{" "}
                    {currProject && dateToMMDDYYYY(currProject.maintenanceEnd)}
                  </Text>
                  <Link href={urls.pages.nonprofit.issues.create} passHref>
                    <Button variant="primary">
                      File a Maintenance Request
                    </Button>
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
                      height="500px"
                      padding="15px 0px"
                      overflow="scroll"
                    >
                      {issues.length > 0 ? (
                        <IssuesTable issues={issues} />
                      ) : (
                        <Text alignSelf="center">No Open Issues</Text>
                      )}
                    </TabPanel>
                    <TabPanel
                      height="500px"
                      padding="15px 0px"
                      overflow="scroll"
                    >
                      {issues.length > 0 ? (
                        <IssuesTable issues={issues} />
                      ) : (
                        <Text>No Closed Issues</Text>
                      )}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </VStack>
            </VStack>
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default NonprofitIssuesPage;
