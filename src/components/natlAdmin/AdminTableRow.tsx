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
import { Types } from "mongoose";
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
  MaintenanceType,
  Nonprofit,
  Project,
  ProjectStage,
  ProjectType,
  Role,
  User,
} from "src/utils/types";

function AdminTableRow(props: { chapter: Chapter }) {
  const { chapter } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const delFunctions = [onClose, onClose];
  const [delFunction, setDelFunction] = React.useState(0);
  const [confirmTitle, setConfirmTitle] = React.useState("");
  const [confirmDesc, setConfirmDesc] = React.useState("");

  const [expanded, setExpanded] = React.useState(false);

  const chapterProjects: Project[] = [];

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

  chapterProjects?.push({
    _id: new Types.ObjectId("321321321321"),
    nonprofit: {
      _id: new Types.ObjectId("549549549549"),
      name: "Nonprofit 1",
      address: {
        street: "B",
        city: "O",
        state: "G",
        zipCode: "S",
        country: "USA",
      },
      isVerified: false,

      contact: {
        _id: Types.ObjectId("240240240240"),
        id: "240",
        email: "contact1@bog.org",
        emailVerified: new Date(),
        name: "Contact 1",
        roles: [Role.NATIONAL_ADMIN],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    name: "Project 1",
    status: ProjectStage.SUBMIT_APPLICATION,
    type: ProjectType.WEBSITE,
    contact: {
      _id: Types.ObjectId("247247247247"),
      id: "247",
      email: "maincontact1@good.org",
      emailVerified: new Date(),
      name: " Main Contact 1",
      roles: [Role.NATIONAL_ADMIN],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    chapter: {
      _id: new Types.ObjectId("322322322322"),
      name: "Chapter 1",
      email: "chapter1@bog.org",
      contact: {
        _id: Types.ObjectId("340340340340"),
        id: "340",
        email: "contact1@bits.org",
        emailVerified: new Date(),
        name: "ChapterContact1",
        roles: [Role.NATIONAL_ADMIN],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      address: {
        street: "B",
        city: "I",
        state: "T",
        zipCode: "S",
        country: "USA",
      },
      maintenanceTypes: [MaintenanceType.BUG_FIXES],
      maintenancePeriod: 6,
    },
  });

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
