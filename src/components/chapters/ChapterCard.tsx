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
import { AiFillFacebook } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import { IoIosCheckmarkCircle, IoIosGlobe } from "react-icons/io";
import { Chapter } from "src/utils/types";

function ChapterCard(props: {
  chapter?: Chapter;
  isSelected: boolean;
  onClick: (id: string) => void;
}) {
  const { chapter, isSelected, onClick: _onClick } = props;
  const open = true; // TODO can't calculate from given information

  function onClick() {
    _onClick(chapter ? chapter._id : "");
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      boxSizing="border-box"
      width="400px"
      minHeight="200px"
      padding={isSelected ? "28px" : "30px"}
      backgroundColor="white"
      border={isSelected ? "3px solid #0069CA" : "1px solid #657788"}
      borderRadius="15px"
      position="relative"
      onClick={!chapter || open ? onClick : undefined}
      opacity={!chapter || open ? 1 : 0.5}
      cursor={!chapter || open ? "pointer" : "default"}
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
      <Box>
        {chapter && !open && (
          <Tag
            backgroundColor="#DEE4E9"
            color="#33333"
            borderRadius="2px"
            px={"4px"}
            marginBottom="10px"
          >
            <b>CLOSED FOR NEW PROJECTS</b>
          </Tag>
        )}
        <Heading fontSize="lg" color="#333333" marginBottom="10px">
          {chapter ? chapter.name : "No Preference"}
        </Heading>
        {chapter ? (
          <VStack align="left" color="#657788" spacing="1px">
            <Text>
              {chapter.address.city}, {chapter.address.state} •{" "}
              <Link color="#0069CA" href={`mailto:${chapter.email}`}>
                Contact
              </Link>
            </Text>
            <Text>{chapter.projectTypes.join(", ")}</Text>
          </VStack>
        ) : (
          <Text>A chapter will be randomly assigned to you.</Text>
        )}
      </Box>
      {chapter && (
        <HStack spacing="20px" marginTop="30px">
          <Link href={chapter.website}>
            <Tooltip label="Website">
              <Box>
                {chapter.website ? (
                  <IoIosGlobe size="20px" color="#333333" />
                ) : (
                  ""
                )}
              </Box>
            </Tooltip>
          </Link>
          <Link href={chapter.instagram}>
            <Tooltip label="Instagram">
              <Box>
                {chapter.instagram ? (
                  <FiInstagram size="20px" color="#333333" />
                ) : (
                  ""
                )}
              </Box>
            </Tooltip>
          </Link>
          <Link href={chapter.facebook}>
            <Tooltip label="Facebook">
              <Box>
                {chapter.facebook ? (
                  <AiFillFacebook size="20px" color="#333333" />
                ) : (
                  ""
                )}
              </Box>
            </Tooltip>
          </Link>
        </HStack>
      )}
    </Box>
  );
}

export default ChapterCard;
