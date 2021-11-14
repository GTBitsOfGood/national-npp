import { Tag, TagLabel } from "@chakra-ui/react";
import { IssueStatus } from "src/utils/types";

const statusColors: { [IssueStatus: string]: number[] } = {
  [IssueStatus.PENDING]: [0, 105, 202],
  [IssueStatus.IN_PROGRESS]: [214, 158, 46],
  [IssueStatus.RESOLVED]: [56, 161, 105],
  [IssueStatus.CLOSED]: [101, 119, 136],
};

interface Props {
  status: IssueStatus;
}

function IssueStatusTag({ status }: Props) {
  const color = statusColors[status];

  return (
    <Tag
      size="lg"
      backgroundColor={`rgba(${color[0]},${color[1]},${color[2]}, 0.1)`}
      color={`rgb(${color[0]},${color[1]},${color[2]})`}
      width="fit-content"
      fontWeight="bold"
    >
      <TagLabel>{status}</TagLabel>
    </Tag>
  );
}

export default IssueStatusTag;
