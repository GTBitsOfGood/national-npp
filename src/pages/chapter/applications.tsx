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
import { ObjectID } from "bson";
import { useEffect, useState } from "react";
import { getChapterProjects } from "src/actions/Project";
import { getChapterUser } from "src/actions/User";
import { showError } from "src/utils/notifications";
import {
  User,
  Nonprofit,
  Project,
  ProjectStage,
  Role,
  ProjectType,
  Chapter,
} from "src/utils/types";

function ChapterApplicationsPage() {
  const [applications, setApplications] = useState<Partial<Project>[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const newApps: Project[] = await getChapterProjects();
      const filteredApps = newApps.filter(
        (app) => app.status === ProjectStage.APPLICATION_REVIEW
      );

      /* Nonprofit name + email doesn't appear on the portal because this is 
         undefined (even though the db structure looks okay)
         Not sure why this is happening so just leaving this here for now 
      */
      console.log((filteredApps[0].contact as User).email);
      console.log((filteredApps[0].nonprofit as Nonprofit).name);
      setApplications(filteredApps);
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
        maxW="1200px"
        maxH="1000px"
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
          overflowY="auto"
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
                <Th paddingInlineStart={4} paddingInlineEnd={4}>
                  Status
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {applications &&
                applications.length !== 0 &&
                applications.map((application, index) => (
                  <Tr
                    key={index}
                    height="100px"
                    cursor="pointer"
                    _hover={{ backgroundColor: "rgba(0, 105, 202, 0.05)" }}
                  >
                    <Td
                      paddingInlineStart={5}
                      paddingInlineEnd={4}
                      fontWeight={600}
                    >
                      {(application.nonprofit as Nonprofit).name}
                    </Td>
                    <Td paddingInlineStart={4} paddingInlineEnd={4}>
                      {application.name}
                    </Td>
                    <Td paddingInlineStart={4} paddingInlineEnd={4}>
                      <Link
                        href={`mailto:${(application.contact as User).email}`}
                        isExternal
                      >
                        {(application.contact as User).email}
                      </Link>
                    </Td>
                    <Td paddingInlineStart={4} paddingInlineEnd={4}>
                      {application.type}
                    </Td>
                    <Td paddingInlineStart={4} paddingInlineEnd={4}>
                      <Button colorScheme="blue">View Application</Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ChapterApplicationsPage;
