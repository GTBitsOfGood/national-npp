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
import { nonprofitGetProjects } from "src/actions/Project";
import IssuesTable from "src/components/nonprofit/issues/IssuesTable";
import MaintenanceProjectCard from "src/components/nonprofit/issues/MaintenanceProjectCard";
import { showError } from "src/utils/notifications";
import { Issue, Project, ProjectStage } from "src/utils/types";
import urls from "src/utils/urls";

function NonprofitIssuesPage() {
  const [projects, setProjects] = useState<Project[]>();
  const [currProject, setCurrProject] = useState<Project>();
  const [issues, setIssues] = useState<Issue[]>();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const projects: Project[] = await nonprofitGetProjects({
        status: ProjectStage.MAINTENANCE,
      });

      if (projects.length !== 0) {
        setCurrProject(projects[0]);
      }

      setProjects(projects);
    }

    fetchProjects().catch((error: Error) => showError(error.message));
  }, []);

  return (
    <Flex height="100%" width="100%" overflow="auto">
      <Flex
        display={{ base: "none", lg: "flex" }}
        direction="column"
        minHeight="700px"
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
            {projects?.map((project) => (
              <MaintenanceProjectCard
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
                Maintenance Period: 02/26/2021 - 05/07/2021
              </Text>
              <Link href={urls.pages.nonprofit.issues.create} passHref>
                <Button variant="primary">File a Request</Button>
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
                <TabPanel height="500px" padding="15px 0px" overflow="scroll">
                  {issues ? (
                    <IssuesTable issues={issues} />
                  ) : (
                    <Text>No Open Issues</Text>
                  )}
                </TabPanel>
                <TabPanel height="500px" padding="15px 0px" overflow="scroll">
                  {issues ? (
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
    </Flex>
  );
}

export default NonprofitIssuesPage;
