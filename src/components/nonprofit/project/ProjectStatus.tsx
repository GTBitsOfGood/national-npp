import { Tag } from "@chakra-ui/react";
import { ProjectStage } from "src/utils/types";
interface StatusProps {
  text: string;
  rgb: number[];
}
const STATUS_MAP: { [key: string]: StatusProps } = {
  [ProjectStage.SUBMIT_APPLICATION]: {
    text: "Application",
    rgb: [0, 105, 202],
  },
  [ProjectStage.APPLICATION_REVIEW]: {
    text: "Application",
    rgb: [0, 105, 202],
  },
  [ProjectStage.SCHEDULE_INTERVIEW]: { text: "Interview", rgb: [128, 90, 213] },
  [ProjectStage.INTERVIEW_SCHEDULED]: {
    text: "Interview",
    rgb: [128, 90, 213],
  },
  [ProjectStage.INTERVIEW_REVIEW]: { text: "Interview", rgb: [128, 90, 213] },
  [ProjectStage.SCHEDULE_MEETING]: { text: "In Progess", rgb: [214, 158, 46] },
  [ProjectStage.MEETING_SCHEDULED]: { text: "In Progess", rgb: [214, 158, 46] },
  [ProjectStage.MAINTENANCE]: {
    text: "Under Maintenance",
    rgb: [56, 161, 105],
  },
  [ProjectStage.COMPLETED]: { text: "Completed", rgb: [56, 161, 105] },
  [ProjectStage.CANCELLED]: { text: "Closed", rgb: [101, 119, 136] },
  [ProjectStage.REJECTED]: { text: "Closed", rgb: [101, 119, 136] },
};

function ProjectStatus(props: { status: string }) {
  const { status } = props;
  const { text, rgb } = STATUS_MAP[status];
  return (
    <Tag
      backgroundColor={`rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.1)`}
      color={`rgb(${rgb[0]},${rgb[1]},${rgb[2]})`}
      width="fit-content"
      fontWeight={600}
    >
      {text}
    </Tag>
  );
}

export default ProjectStatus;
