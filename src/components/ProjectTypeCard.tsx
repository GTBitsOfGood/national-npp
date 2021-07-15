import {
  Box,
  Heading,
  Text,
  Link,
  HStack,
  Tooltip,
  VStack,
  Tag,
} from "@chakra-ui/react";
import { Chapter } from "src/utils/types";

function ProjectTypeCard() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      boxSizing="border-box"
      width="400px"
      minHeight="160px"
      padding={"30px"}
      backgroundColor="white"
      borderRadius="15px"
      position="relative"
    />
  );
}

export default ProjectTypeCard;
