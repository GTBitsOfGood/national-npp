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
      <Thead color="#999999">
        <Tr>
          <Th>Organization</Th>
          <Th>Website</Th>
          <Th>E-mail</Th>
          <Th>Start Date</Th>
          <Th>Last Updated</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody color="#333333">
        {projects.map((project) => (
          <Tr key={project.id}>
            <Td fontWeight={600}>{project.org}</Td>
            <Td>
              <Link href={`https://${project.website}`} isExternal>
                {project.website}
              </Link>
            </Td>
            <Td>
              <Link href={`mailto:${project.email}`} isExternal>
                {project.email}
              </Link>
            </Td>
            <Td>{dateToString(project.started)}</Td>
            <Td>{dateToString(project.lastUpdated)}</Td>
            <Td>
              <ChapterProjectStatus status={project.status} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ChapterProjectsTable;
