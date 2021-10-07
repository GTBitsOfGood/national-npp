import { VStack, Heading, Box, Text } from "@chakra-ui/layout";
import { Dispatch, SetStateAction } from "react";
import { Project } from "src/utils/types";
import ProjectStatus from "./ProjectStatus";

interface Props {
  mobile: boolean;
  projects: Project[];
  currProject: Partial<Project>;
  setCurrProject: Dispatch<SetStateAction<Partial<Project>>>;
}
const ProjectCards = ({
  mobile,
  projects,
  currProject,
  setCurrProject,
}: Props) => {
  return (
    <Box
      display="flex"
      direction={mobile ? "row" : "column"}
      flexWrap={mobile ? "nowrap" : "wrap"}
      whiteSpace={mobile ? "nowrap" : "normal"}
      overflow="scroll"
      height={mobile ? "150px" : ""}
      flexGrow={1}
    >
      {projects.length !== 0 ? (
        projects.map((project: Project, index) => (
          <VStack
            key={index}
            bgColor="white"
            my="5"
            mr={mobile ? "5" : "0"}
            px="5"
            justifyContent="center"
            alignItems="left"
            spacing="5"
            w={mobile ? "400px" : "full"}
            height={mobile ? "100px" : "150px"}
            backgroundColor="surface"
            border="1px"
            borderColor={
              project._id === currProject._id ? "#0069CA" : "#BCC5D1"
            }
            borderRadius="15px"
            onClick={() => setCurrProject(project)}
          >
            <Heading size={mobile ? "md" : "lg"}>{project.name}</Heading>
            <ProjectStatus status={project.status} />
          </VStack>
        ))
      ) : (
        <VStack
          bgColor="white"
          my="5"
          px="5"
          justifyContent="center"
          alignItems="center"
          spacing="5"
          w={mobile ? "400px" : "full"}
          height={mobile ? "100px" : "150px"}
          border="1px"
          borderRadius="15px"
          borderStyle="dashed"
          backgroundColor="inherit"
        >
          <Text>No Projects Yet</Text>
        </VStack>
      )}
    </Box>
  );
};

export default ProjectCards;
