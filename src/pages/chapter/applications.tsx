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
import {
  User,
  Nonprofit,
  Project,
  ProjectStage,
  Role,
  ProjectType,
} from "src/utils/types";

function ChapterApplicationsPage() {
  const [applications, setApplications] = useState<Partial<Project>[]>([]);

  useEffect(() => {
    // fetch applications from database here
    const newApps: Project[] = [];
    for (let i = 0; i < 20; i += 1) {
      newApps.push({
        _id: new ObjectID("7B39BDDDC643564D877D7770"),
        nonprofit: {
          _id: new ObjectID("7B39BDDDC643564D877D7770"),
          contact: new ObjectID("7B39BDDDC643564D877D7770"),
          name: "Liv2BGirl",
          address: {
            city: "Sydney",
            street: "42 Wallaby Way",
            state: "New South Wales",
            zipCode: "50679",
            country: "Australia",
          },
          isVerified: false,
        },
        contact: {
          _id: new ObjectID("7B39BDDDC643564D877D7770"),
          id: "test",
          email: "test@xyz.com",
          emailVerified: new Date(),
          name: "Saurav Ghosal",
          roles: [Role.CHAPTER_MEMBER],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        type: ProjectType.WEBSITE,
        chapter: new ObjectID("7B39BDDDC643564D877D7770"),
        name: "test project",
        createdAt: new Date(),
        updatedAt: new Date(),
        status: ProjectStage.SUBMIT_APPLICATION,
      });
    }
    setApplications(newApps);
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
