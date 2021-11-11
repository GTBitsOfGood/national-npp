import { Table, Tbody, Thead, Td, Tr, Th, Tag } from "@chakra-ui/react";
import { BsChevronRight } from "react-icons/bs";
import { dateToMMDDYYYY } from "src/utils/dates";
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
            <Td>{dateToMMDDYYYY(new Date(issue.createdAt))}</Td>
            <Td>
              {issue.finishedAt
                ? dateToMMDDYYYY(new Date(issue.finishedAt))
                : "-"}
            </Td>
            <Td>
              <Tag
                backgroundColor={`rgba(${214},${158},${46}, 0.1)`}
                color={`rgba(${214},${158},${46})`}
                width="fit-content"
                fontWeight="bold"
              >
                {issue.status}
              </Tag>
            </Td>
            <Td>
              <BsChevronRight />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default IssuesTable;
