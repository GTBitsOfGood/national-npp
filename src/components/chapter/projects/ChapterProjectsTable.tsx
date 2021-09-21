import { Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import type { ChapterProject } from "src/utils/types";
import ChapterProjectStatus from "./ChapterProjectStatus";

function ChapterProjectsTable(props: { projects: ChapterProject[] }) {
  const { projects } = props;

  function dateToString(date: Date) {
    const dateOfMonth = `0${date.getDate().toString().slice(-2)}`;
    const month = `0${(date.getMonth() + 1).toString().slice(-2)}`;
    const year = date.getFullYear();

    return `${month}/${dateOfMonth}/${year}`;
  }

  return (
    <Table variant="unstyled" size="lg">
      <Thead color="#999999" borderBottom="1px solid #E2E8F0">
        <Tr height="100px">
          <Th paddingInlineStart={5} paddingInlineEnd={4}>
            Organization
          </Th>
          <Th paddingInlineStart={4} paddingInlineEnd={4}>
            Website
          </Th>
          <Th paddingInlineStart={4} paddingInlineEnd={4}>
            E-mail
          </Th>
          <Th paddingInlineStart={4} paddingInlineEnd={4}>
            Start Date
          </Th>
          <Th paddingInlineStart={4} paddingInlineEnd={4}>
            Last Updated
          </Th>
          <Th paddingInlineStart={4} paddingInlineEnd={4}>
            Status
          </Th>
        </Tr>
      </Thead>
      <Tbody overflowY="auto">
        {projects.map((project) => (
          <Tr
            key={project.id}
            height="100px"
            cursor="pointer"
            _hover={{ backgroundColor: "rgba(0, 105, 202, 0.05)" }}
          >
            <Td paddingInlineStart={5} paddingInlineEnd={4} fontWeight={600}>
              {project.org}
            </Td>
            <Td paddingInlineStart={4} paddingInlineEnd={4}>
              <Link href={`https://${project.website}`} isExternal>
                {project.website}
              </Link>
            </Td>
            <Td paddingInlineStart={4} paddingInlineEnd={4}>
              <Link href={`mailto:${project.email}`} isExternal>
                {project.email}
              </Link>
            </Td>
            <Td paddingInlineStart={4} paddingInlineEnd={4}>
              {dateToString(project.started)}
            </Td>
            <Td paddingInlineStart={4} paddingInlineEnd={4}>
              {dateToString(project.lastUpdated)}
            </Td>
            <Td paddingInlineStart={4} paddingInlineEnd={4}>
              <ChapterProjectStatus status={project.status} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ChapterProjectsTable;
