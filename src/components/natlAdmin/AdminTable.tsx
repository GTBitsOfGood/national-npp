import {
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Menu,
  MenuButton,
  Box,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import ConfirmAlertWithInput from "src/components/shared/ConfirmAlertWithInput";
import { showError, showInfo } from "src/utils/notifications";
import type { Chapter, Nonprofit, User } from "src/utils/types";

interface Props {
  chapters?: Chapter[];
  nonprofits?: Nonprofit[];
  chapterIsActive: boolean;
}

function AdminTable({ chapters, nonprofits, chapterIsActive }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const delFunctions = [onClose, onClose];
  const [delFunction, setDelFunction] = React.useState(0);
  const [confirmTitle, setConfirmTitle] = React.useState("");
  const [confirmDesc, setConfirmDesc] = React.useState("");

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
      <Table variant="unstyled" size="lg">
        <Thead color="#999999" borderBottom="1px solid #E2E8F0">
          <Tr height="100px">
            <Th paddingInlineStart={5} paddingInlineEnd={4}>
              Organization
            </Th>
            <Th paddingInlineStart={4} paddingInlineEnd={4}>
              Website
            </Th>
            <Th paddingInlineStart={4} paddingInlineEnd={4}>
              Contact Email
            </Th>
          </Tr>
        </Thead>
        <Tbody overflowY="auto">
          {chapters && chapterIsActive ? (
            <>
              {chapters.map((chapter) => (
                <Tr
                  key={chapter.name}
                  height="100px"
                  cursor="pointer"
                  _hover={{ backgroundColor: "rgba(0, 105, 202, 0.05)" }}
                >
                  <Td
                    paddingInlineStart={5}
                    paddingInlineEnd={4}
                    fontWeight={600}
                  >
                    {chapter.name}
                  </Td>
                  <Td paddingInlineStart={4} paddingInlineEnd={4}>
                    <Link href={chapter.website} isExternal>
                      {chapter.website}
                    </Link>
                  </Td>
                  <Td paddingInlineStart={4} paddingInlineEnd={4}>
                    <Link
                      href={`mailto:${(chapter.contact as User).email}`}
                      isExternal
                    >
                      {(chapter.contact as User).email}
                    </Link>
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
              ))}
            </>
          ) : (
            <>
              {nonprofits &&
                nonprofits.map((nonprofit) => (
                  <Tr
                    key={nonprofit.name}
                    height="100px"
                    cursor="pointer"
                    _hover={{ backgroundColor: "rgba(0, 105, 202, 0.05)" }}
                  >
                    <Td
                      paddingInlineStart={5}
                      paddingInlineEnd={4}
                      fontWeight={600}
                    >
                      {nonprofit.name}
                    </Td>
                    <Td paddingInlineStart={4} paddingInlineEnd={4}>
                      <Link href={nonprofit.website} isExternal>
                        {nonprofit.website}
                      </Link>
                    </Td>
                    <Td paddingInlineStart={4} paddingInlineEnd={4}>
                      <Link
                        href={`mailto:${(nonprofit.contact as User).email}`}
                        isExternal
                      >
                        {(nonprofit.contact as User).email}
                      </Link>
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
                            Edit Nonprofit
                          </MenuItem>
                          <Box
                            as="button"
                            width="100%"
                            onClick={() =>
                              handleClick(
                                "Delete Nonprofit",
                                "Please confirm that you would like to delete this nonprofit.",
                                1
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
                              Delete Nonprofit
                            </MenuItem>
                          </Box>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
            </>
          )}
        </Tbody>
      </Table>
    </>
  );
}

export default AdminTable;
