import {
  Box,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {
  BsThreeDots,
  BsArrowUpRight,
  BsChevronRight,
  BsChevronDown,
} from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import ConfirmAlertWithInput from "src/components/shared/ConfirmAlertWithInput";
import { showError, showInfo } from "src/utils/notifications";
import {
  Chapter,
  Nonprofit,
  Project,
  User,
} from "src/utils/types";

interface Props {
    chapter: Chapter;
    chapterProjects?: Project[];
  }

function AdminTableRow({ chapter, chapterProjects }: Props) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const delFunctions = [onClose, onClose];
  const [delFunction, setDelFunction] = React.useState(0);
  const [confirmTitle, setConfirmTitle] = React.useState("");
  const [confirmDesc, setConfirmDesc] = React.useState("");

  const [expanded, setExpanded] = React.useState(false);

  const handleClick = (
    newConfirmTitle: string,
    newConfirmDesc: string,
    newDelFunction: number
  ) => {
    setConfirmTitle(newConfirmTitle);
    setConfirmDesc(newConfirmDesc);
    setDelFunction(newDelFunction);
    onOpen();
  };

  const handleDelete = (deleteFunc: () => void) => {
    try {
      deleteFunc();
      showInfo("Successfully deleted. An email is being sent.");
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ConfirmAlertWithInput
        title={confirmTitle}
        description={confirmDesc}
        confirmText="Delete"
        onConfirm={() => handleDelete(delFunctions[delFunction])}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Tr
        height="100px"
        cursor="pointer"
        _hover={{ backgroundColor: "rgba(0, 105, 202, 0.05)" }}
        onClick={() => handleToggle()}
      >
        <Td paddingInlineStart={5} paddingInlineEnd={4} fontWeight={700}>
          <HStack>
            {expanded ? <BsChevronDown /> : <BsChevronRight />}
            <Box>{chapter.name}</Box>
          </HStack>
        </Td>
        <Td paddingInlineStart={4} paddingInlineEnd={4}>
          <Link href={chapter.website} isExternal>
            {chapter.website}
          </Link>
        </Td>
        <Td paddingInlineStart={4} paddingInlineEnd={4}>
          <Link href={`mailto:${chapter.email}`} isExternal>
            {chapter.email}
          </Link>
        </Td>
        <Td paddingInlineStart={4} paddingInlineEnd={4}>
          {5}
        </Td>
        <Td>
          <Menu>
            <MenuButton>
              <Box as="button">
                <BsThreeDots />
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem
                borderBottomWidth={"thin"}
                color="#858585"
                fontWeight={"semibold"}
                paddingBottom={4}
                paddingLeft={4}
                fontFamily={"Tahoma"}
                fontStyle={"normal"}
                icon={<RiPencilFill size={20} />}
              >
                Edit Chapter
              </MenuItem>
              <Box
                as="button"
                width="100%"
                onClick={() =>
                  handleClick(
                    "Delete Chapter",
                    "Please confirm that you would like to delete this chapter.",
                    0
                  )
                }
              >
                <MenuItem
                  color="danger"
                  fontWeight={"semibold"}
                  paddingLeft={4}
                  paddingTop={4}
                  fontFamily={"Tahoma"}
                  fontStyle={"normal"}
                  icon={<FaTrash size={20} />}
                >
                  Delete Chapter
                </MenuItem>
              </Box>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      {expanded && (
        <Tr>
          <Td colSpan={5}>
            <Box
              marginBottom={5}
              marginRight={5}
              marginLeft={5}
              border="1px solid #E2E8F0"
              borderRadius={10}
              overflowX="hidden"
              maxheight="250px"
            >
              <Table variant="unstyled" size="sm">
                <Thead color="#999999">
                  <Tr height="50px">
                    <Th paddingInlineStart={5} paddingInlineEnd={4}>
                      Non-profit
                    </Th>
                    <Th paddingInlineStart={4} paddingInlineEnd={4}>
                      Project name
                    </Th>
                    <Th paddingInlineStart={4} paddingInlineEnd={4}>
                      CONTACT EMAIL
                    </Th>
                    <Th paddingInlineStart={4} paddingInlineEnd={4}>
                      Product type
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {chapterProjects &&
                    chapterProjects.map((chapterProject) => (
                      <Tr height="50px" key={chapterProject.name}>
                        <Td
                          paddingInlineStart={5}
                          paddingInlineEnd={4}
                          fontWeight={700}
                          color="primary"
                        >
                          {(chapterProject.nonprofit as Nonprofit).name}
                        </Td>
                        <Td
                          paddingInlineStart={4}
                          paddingInlineEnd={4}
                          fontWeight={500}
                        >
                          {chapterProject.name}
                        </Td>
                        <Td
                          paddingInlineStart={4}
                          paddingInlineEnd={4}
                          fontWeight={500}
                        >
                          {(chapterProject.contact as User).email}
                        </Td>
                        <Td
                          paddingInlineStart={4}
                          paddingInlineEnd={4}
                          fontWeight={500}
                        >
                          {chapterProject.type}
                        </Td>
                        <Td>
                          <Link color="primary">
                            <HStack>
                              <Box>View Project</Box>
                              <BsArrowUpRight />
                            </HStack>
                          </Link>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          </Td>
        </Tr>
      )}
    </>
  );
}

export default AdminTableRow;
