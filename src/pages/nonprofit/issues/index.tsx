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
import { useEffect, useState } from "react";
import { nonprofitGetIssues, nonprofitGetProjects } from "src/actions/Project";
import IssuesTable from "src/components/nonprofit/issues/IssuesTable";
import MaintenanceProjectCard from "src/components/nonprofit/issues/MaintenanceProjectCard";
import { dateDiffInDays, dateToMMDDYYYY } from "src/utils/dates";
import { showError } from "src/utils/notifications";
import {
  Issue,
  IssueStatus,
  Chapter,
  Project,
  ProjectStage,
} from "src/utils/types";
import urls from "src/utils/urls";

function NonprofitIssuesPage() {
  const [projects, setProjects] = useState<Project[]>();
  const [currProject, setCurrProject] = useState<Project>();
  const [issues, setIssues] = useState<Issue[]>();

  useEffect(() => {
    async function fetchProjects() {
      let projects: Project[] = await nonprofitGetProjects({
        status: ProjectStage.MAINTENANCE,
      });

      projects = projects.map((project) => {
        // maintenance start will never be undefined if stage is maintenance
        const endDate = new Date(project.maintenanceStart!);
        endDate.setDate(
          endDate.getDate() + (project.chapter as Chapter).maintenancePeriod
        );
        return {
          ...project,
          maintenanceEnd: endDate,
          remainingDays: dateDiffInDays(new Date(), endDate),
        };
      });
      if (projects.length !== 0) {
        setCurrProject(projects[0]);
      }
      setProjects(projects);
    }

    fetchProjects().catch((error: Error) => showError(error.message));
  }, []);

  useEffect(() => {
    async function fetchIssues() {
      if (currProject) {
        const issues: Issue[] = await nonprofitGetIssues(
          currProject._id.toString()
        );
        setIssues(issues);
      }
    }

    fetchIssues().catch((error: Error) => showError(error.message));
  }, [currProject]);

  const findOpenIssues = (issue: Issue) =>
    issue.status == IssueStatus.IN_PROGRESS ||
    issue.status == IssueStatus.PENDING;

  const findClosedIssues = (issue: Issue) =>
    issue.status == IssueStatus.CLOSED || issue.status == IssueStatus.RESOLVED;

  return (
    <Flex height="100%" width="100%" overflow="auto">
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
            {projects?.map((project: Project) => (
              <MaintenanceProjectCard
                remainingDays={dateDiffInDays(
                  new Date(),
                  project.maintenanceEnd!
                )}
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
            loading times too long, or are your users facing bugs? Let us know
            and we will contact you soon with an estimated timeline for a fix.
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
                {currProject &&
                  dateToMMDDYYYY(new Date(currProject.maintenanceStart!))}{" "}
                - {currProject && dateToMMDDYYYY(currProject.maintenanceEnd!)}
              </Text>
              <Link href={urls.pages.nonprofit.issues.create} passHref>
                <Button variant="primary">File a Maintenance Request</Button>
              </Link>
            </Flex>
            <Tabs>
              <TabList>
                <Tab
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  Open Issues
                </Tab>
                <Tab
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  Closed Issues
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel height="500px" padding="15px 0px" overflow="scroll">
                  {issues && issues.filter(findOpenIssues).length > 0 ? (
                    <IssuesTable issues={issues.filter(findOpenIssues)} />
                  ) : (
                    <Text alignSelf="center">No Open Issues</Text>
                  )}
                </TabPanel>
                <TabPanel height="500px" padding="15px 0px" overflow="scroll">
                  {issues && issues.filter(findClosedIssues).length > 0 ? (
                    <IssuesTable issues={issues.filter(findClosedIssues)} />
                  ) : (
                    <Text>No Closed Issues</Text>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default NonprofitIssuesPage;
