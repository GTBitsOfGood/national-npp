import { Table, Tbody, Thead, Td, Tr, Th } from "@chakra-ui/react";
import { useRouter } from "next/router";
import IssueStatusTag from "src/components/shared/IssueStatusTag";
import { dateToMMDDYYYY } from "src/utils/dates";
import { Issue } from "src/utils/types";
import urls from "src/utils/urls";

interface Props {
  issues: Issue[];
}

function IssuesTable({ issues }: Props) {
  const router = useRouter();

  const viewIssue = async (issue: Issue) => {
    await router.push(
      urls.pages.nonprofit.projects.index +
        `/${issue.project.toString()}/issues/${issue._id.toString()}`
    );
  };

  return (
    <Table size="lg">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Issue Type</Th>
          <Th>Issued</Th>
          <Th>Resolved</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {issues.map((issue) => (
          <Tr
            key={issue.title}
            cursor="pointer"
            _hover={{ backgroundColor: "rgba(0, 105, 202, 0.05)" }}
            onClick={() => viewIssue(issue)}
          >
            <Td>{issue.title}</Td>
            <Td>{issue.type}</Td>
            <Td>{dateToMMDDYYYY(new Date(issue.createdAt))}</Td>
            <Td>
              {issue.finishedAt
                ? dateToMMDDYYYY(new Date(issue.finishedAt))
                : "-"}
            </Td>
            <Td>
              <IssueStatusTag status={issue.status} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default IssuesTable;
