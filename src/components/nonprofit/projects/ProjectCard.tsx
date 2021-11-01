import { Flex, Heading, VStack } from "@chakra-ui/react";
import ProjectStatus from "src/components/nonprofit/projects/ProjectStatus";
import { Project } from "src/utils/types";

interface Props {
  isSelected: boolean;
  project: Project;
  onClick: (project: Project) => void;
}

function ProjectCard({ isSelected, project, onClick }: Props) {
  return (
    <Flex
      width="100%"
      borderBottom="1px solid"
      borderColor="border"
      padding="20px"
      _hover={
        isSelected
          ? { cursor: "default" }
          : { cursor: "pointer", boxShadow: "base" }
      }
      onClick={() => onClick(project)}
    >
      <VStack align="stretch" spacing="15px" overflow="hidden">
        <Heading fontSize="xl">{project.name}</Heading>
        <ProjectStatus status={project.status} />
      </VStack>
    </Flex>
  );
}

export default ProjectCard;
