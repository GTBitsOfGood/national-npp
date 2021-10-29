import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { chapterGetProjects } from "src/actions/Project";
import { showError } from "src/utils/notifications";
import { User, Nonprofit, Project, ProjectStage } from "src/utils/types";

function ChapterApplicationsPage() {
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    async function loadProjects() {
      const newProjects: Project[] = await chapterGetProjects({
        status: ProjectStage.APPLICATION_REVIEW,
      });

      setProjects(newProjects);
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
      <VStack align="stretch" marginX="auto" spacing="40px">
        <Heading fontSize={{ base: "2xl", md: "3xl" }} paddingLeft="20px">
          Nonprofit Applications
        </Heading>
        <Flex
          minH="600px"
          maxW="1250px"
          maxH="900px"
          marginX="auto"
          padding={50}
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          backgroundColor="surface"
          flexShrink={0}
          flexGrow={1}
          justifyContent="center"
          alignItems="stretch"
        >
          <Flex
            backgroundColor="surface"
            border="1px solid #E2E8F0"
            borderRadius="md"
            flex="1 1 auto"
            overflowX="hidden"
          >
            <Box width="100%">
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
                  </Tr>
                </Thead>
                <Tbody overflowY="auto">
                  {projects && projects.length !== 0 ? (
                    projects.map((project, index) => {
                      const projectNonprofit = project.nonprofit as Nonprofit;
                      const nonprofitContact = projectNonprofit.contact as User;

                      return (
                        <Tr
                          key={index}
                          height="100px"
                          cursor="pointer"
                          _hover={{
                            backgroundColor: "rgba(0, 105, 202, 0.05)",
                          }}
                        >
                          <Td
                            paddingInlineStart={5}
                            paddingInlineEnd={4}
                            fontWeight={600}
                          >
                            {projectNonprofit.name}
                          </Td>
                          <Td paddingInlineStart={4} paddingInlineEnd={4}>
                            {project.name}
                          </Td>
                          <Td paddingInlineStart={4} paddingInlineEnd={4}>
                            {nonprofitContact.email}
                          </Td>
                          <Td paddingInlineStart={4} paddingInlineEnd={4}>
                            {project.type}
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
                        There are no new projects.
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default ChapterApplicationsPage;
