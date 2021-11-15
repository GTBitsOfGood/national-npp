import { Flex, Heading, Tag, VStack } from "@chakra-ui/react";
import { MaintenanceProject } from "src/utils/types";

interface Props {
  isSelected: boolean;
  project: MaintenanceProject;
  onClick: (project: MaintenanceProject) => void;
}

function MaintenanceProjectCard({ isSelected, project, onClick }: Props) {
  return (
    <Flex
      width="100%"
      borderBottom="1px solid"
      borderColor="border"
      padding="20px"
      _hover={isSelected ? { cursor: "default" } : { cursor: "pointer" }}
      backgroundColor={isSelected ? "gray.50" : "surface"}
      onClick={() => onClick(project)}
    >
      <VStack align="stretch" spacing="15px" overflow="hidden">
        <Heading fontSize="xl">{project.name}</Heading>
        <Tag
          backgroundColor={`rgba(${56},${161},${105}, 0.1)`}
          color={`rgba(${56},${161},${105})`}
          width="fit-content"
          fontWeight="bold"
        >
          {project.remainingDays} Days Remaining
        </Tag>
      </VStack>
    </Flex>
  );
}

export default MaintenanceProjectCard;
