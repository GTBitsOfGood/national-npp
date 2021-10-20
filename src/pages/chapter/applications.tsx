import {
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Tr,
  Link,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProjects } from "src/actions/Project";
import { showError } from "src/utils/notifications";
import { User, Nonprofit, Project, ProjectStage } from "src/utils/types";

function ChapterApplicationsPage() {
  const [applications, setApplications] = useState<Project[] | []>([]);

  useEffect(() => {
    async function loadProjects() {
      const newApps: Project[] = await getProjects(
        ProjectStage.APPLICATION_REVIEW
      );

      /* Nonprofit name + email doesn't appear on the portal because this is 
         undefined (even though the db structure looks okay)
         Not sure why this is happening so just leaving this here for now 
      */
      console.log((newApps[0].contact as User).email);
      console.log((newApps[0].nonprofit as Nonprofit).name);
      setApplications(newApps);
    }

    loadProjects().catch((e) => {
      const error = e as Error;
      showError(error.message);
    });
  }, []);

  return (
    <Flex
      height="100%"
      width="100%"
      alignItems="stretch"
      overflow="auto"
      p={50}
    >
      <Flex
        minH="600px"
        maxW="1250px"
        maxH="900px"
        marginX="auto"
        padding={50}
        border="1px solid #657788"
        borderRadius={10}
        backgroundColor="surface"
        flexShrink={0}
        flexGrow={1}
        justifyContent="center"
        alignItems="stretch"
      >
        <Flex
          backgroundColor="surface"
          border="1px solid #E2E8F0"
          borderBottomLeftRadius={10}
          borderTopRightRadius={10}
          borderBottomRightRadius={10}
          flex="1 1 auto"
          overflowX="hidden"
        >
          <Table variant="unstyled" size="lg">
            <Thead color="#999999" borderBottom="1px solid #E2E8F0">
              <Tr height="100px">
                <Th paddingInlineStart={5} paddingInlineEnd={4}>
                  Organization
                </Th>
                <Th paddingInlineStart={4} paddingInlineEnd={4}>
                  Project Name
                </Th>
                <Th paddingInlineStart={4} paddingInlineEnd={4}>
                  Contact Email
                </Th>
                <Th paddingInlineStart={4} paddingInlineEnd={4}>
                  Project Type
                </Th>
                <Th paddingInlineStart={4} paddingInlineEnd={4}></Th>
              </Tr>
            </Thead>
            <Tbody overflowY="auto" height="fit-content">
              {applications && applications.length !== 0 ? (
                applications.map((application, index) => {
                  const projectNonprofit = application.nonprofit as Nonprofit;
                  const projectContact = application.contact as User;

                  return (
                    <Tr key={index} height="100px">
                      <Td
                        paddingInlineStart={5}
                        paddingInlineEnd={4}
                        fontWeight={600}
                      >
                        {projectNonprofit.name}
                      </Td>
                      <Td paddingInlineStart={4} paddingInlineEnd={4}>
                        {application.name}
                      </Td>
                      <Td paddingInlineStart={4} paddingInlineEnd={4}>
                        <Link
                          href={`mailto:${projectContact.email}`}
                          isExternal
                        >
                          {projectContact.email}
                        </Link>
                      </Td>
                      <Td paddingInlineStart={4} paddingInlineEnd={4}>
                        {application.type}
                      </Td>
                      <Td paddingInlineStart={4} paddingInlineEnd={4}>
                        <Button variant="primary">View Application</Button>
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    There are no new projects
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ChapterApplicationsPage;
