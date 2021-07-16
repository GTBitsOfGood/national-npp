import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { BsCircleFill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ProjectType } from "src/utils/types";

function ProjectTypeCard(props: {
  projectType: ProjectType;
  isSelected: boolean;
  onClick: (projectType: ProjectType) => void;
}) {
  const { projectType, isSelected, onClick: _onClick } = props;

  function onClick() {
    _onClick(projectType);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      boxSizing="border-box"
      width="400px"
      minHeight="160px"
      padding={isSelected ? "28px" : "30px"}
      backgroundColor="white"
      border={isSelected ? "3px solid #0069CA" : "1px solid #657788"}
      borderRadius="15px"
      position="relative"
      onClick={onClick}
      // cursor={!chapter || open ? "pointer" : "default"}
    >
      {isSelected && (
        <Box position="absolute" top="-15px" left="-15px">
          <Box position="absolute" top="5px" left="5px">
            <BsCircleFill size="20px" color="white" />
          </Box>
          <Box position="absolute">
            <IoIosCheckmarkCircle size="30px" color="#0069CA" />
          </Box>
        </Box>
      )}
      <VStack align="left" color="#657788" spacing="1px">
        <Heading fontSize="lg" color="#333333" marginBottom="1px">
          {projectType}
        </Heading>
        {projectType === "Web app" ? (
          <Text> This is the description for Web app</Text>
        ) : (
          ""
        )}
        {projectType === "Website" ? (
          <Text>This is the description for Website</Text>
        ) : (
          ""
        )}
        {projectType === "Mobile app" ? (
          <Text> This is the description for Mobile App</Text>
        ) : (
          ""
        )}
      </VStack>
    </Box>
  );
}

export default ProjectTypeCard;
