import { Tag } from "@chakra-ui/react";

interface StatusProps {
  text: string;
  rgb: number[];
}

const STATUS_MAP: { [key: string]: StatusProps } = {
  newApp: {
    text: "New Application",
    rgb: [0, 105, 202],
  },
  appComplete: {
    text: "Application Complete",
    rgb: [56, 161, 105],
  },
  interviewScheduled: {
    text: "Interview Scheduled",
    rgb: [128, 90, 213],
  },
  underReview: {
    text: "Under Review",
    rgb: [221, 107, 32],
  },
  inProgress: {
    text: "In Progress",
    rgb: [214, 158, 46],
  },
  delivered: {
    text: "Delivered",
    rgb: [56, 161, 105],
  },
  maintenance: {
    text: "In Maintenance",
    rgb: [101, 119, 136],
  },
  meetingScheduled: {
    text: "Meeting Scheduled",
    rgb: [128, 90, 213],
  },
  rejected: {
    text: "Rejected",
    rgb: [242, 89, 75],
  },
  cancelled: {
    text: "Cancelled",
    rgb: [101, 119, 136],
  },
};

function ChapterProjectStatus(props: { status: string }) {
  const { status } = props;
  const { text, rgb } = STATUS_MAP[status];
  return (
    <Tag
      backgroundColor={`rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.1)`}
      color={`rgb(${rgb[0]},${rgb[1]},${rgb[2]})`}
      fontWeight={600}
    >
      {text}
    </Tag>
  );
}

export default ChapterProjectStatus;
