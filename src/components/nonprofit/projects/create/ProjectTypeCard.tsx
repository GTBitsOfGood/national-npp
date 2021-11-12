import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { BsCircleFill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { ProjectType } from "src/utils/types";

interface Props {
  projectType: ProjectType;
  isSelected: boolean;
  onClick: () => void;
}

function ProjectTypeCard({ projectType, isSelected, onClick }: Props) {
  let description = "";

  switch (projectType) {
    case ProjectType.WEB_APP:
      description =
        "Quisque ultricies facilisis posuere. Sed ante mi, efficitur id tempus vitae, interdum nec leo. Mauris sollicitudin dui vel velit dapibus accumsan. Sed in odio viverra, euismod enim in, vestibulum ante. Nunc feugiat metus leo, nec maximus nisl commodo sit amet. Donec dapibus leo sed facilisis rhoncus. Sed dictum sed neque id dictum.";
      break;
    case ProjectType.WEBSITE:
      description =
        "Quisque ultricies facilisis posuere. Sed ante mi, efficitur id tempus vitae, interdum nec leo. Mauris sollicitudin dui vel velit dapibus accumsan. Sed in odio viverra, euismod enim in, vestibulum ante. Nunc feugiat metus leo, nec maximus nisl commodo sit amet.";
      break;
    case ProjectType.MOBILE_APP:
      description =
        "Quisque ultricies facilisis posuere. Sed ante mi, efficitur id tempus vitae, interdum nec leo. Mauris sollicitudin dui vel velit dapibus accumsan. Sed in odio viverra, euismod enim in, vestibulum ante.";
      break;
    default:
      description = "Unknown project type.";
      break;
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      width="350px"
      height="100%"
      padding={isSelected ? "28px" : "30px"}
      backgroundColor="surface"
      border={isSelected ? "3px solid" : "1px solid"}
      borderColor={isSelected ? "primary" : "border"}
      borderRadius="lg"
      position="relative"
      onClick={onClick}
      _hover={{ cursor: isSelected ? "default" : "pointer" }}
    >
      {isSelected && (
        <Box position="absolute" top="-15px" left="-15px">
          <Box position="absolute" top="5px" left="5px">
            <BsCircleFill size="20px" color="#FFFFFF" />
          </Box>
          <Box position="absolute">
            <IoIosCheckmarkCircle size="30px" color="#0069CA" />
          </Box>
        </Box>
      )}
      <VStack align="left" spacing="10px">
        <Heading fontSize="lg">{projectType}</Heading>
        <Text color="secondaryText">{description}</Text>
      </VStack>
    </Flex>
  );
}

export default ProjectTypeCard;
