import { Table, Tbody, Thead, Td, Tr, Th } from "@chakra-ui/react";
import { Issue } from "src/utils/types";

interface Props {
  issues: Issue[];
}

function IssuesTable({ issues }: Props) {
  return (
    <Table size="lg">
      <Thead>
        <Tr>
          <Th>Issue Type</Th>
          <Th>Title</Th>
          <Th>Issued</Th>
          <Th>Resolved</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {issues.map((issue) => (
          <Tr key={issue.title}>
            <Td>{issue.type}</Td>
            <Td>{issue.title}</Td>
            <Td>{issue.createdAt.toLocaleDateString()}</Td>
            <Td>
              {issue.finishedAt ? issue.finishedAt.toLocaleDateString() : "-"}
            </Td>
            <Td>{issue.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default IssuesTable;
