import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    Link,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useDisclosure,
  } from "@chakra-ui/react";
  import { useSession } from "next-auth/client";
  import { BsThreeDots } from "react-icons/bs";
  import { FaTrash } from "react-icons/fa";
  import { RiPencilFill } from "react-icons/ri";
  import ConfirmAlert from "src/components/shared/ConfirmAlert";
  import type { ChapterProject } from "src/utils/types";
  
  function ChapterTable(props: { projects: ChapterProject[] }) {
    const { projects } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [session, isLoading] = useSession();
    if (isLoading) return null;
    const user = session?.user;
  
    function dateToString(date: Date) {
      const dateOfMonth = `0${date.getDate().toString().slice(-2)}`;
      const month = `0${(date.getMonth() + 1).toString().slice(-2)}`;
      const year = date.getFullYear();
  
      return `${month}/${dateOfMonth}/${year}`;
    }
  
    return (
      <>
        <ConfirmAlert
          title="Delete Chapter"
          description="Please confirm that you would like to delete this chapter."
          confirmText="Delete"
          onConfirm={onClose}
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
                E-mail
              </Th>
              <Th paddingInlineStart={4} paddingInlineEnd={4}>
                Start Date
              </Th>
              <Th paddingInlineStart={4} paddingInlineEnd={4}>
                Last Updated
              </Th>
            </Tr>
          </Thead>
          <Tbody overflowY="auto">
            {projects.map((project) => (
              <Tr
                key={project.id}
                height="100px"
                cursor="pointer"
                _hover={{ backgroundColor: "rgba(0, 105, 202, 0.05)" }}
              >
                <Td paddingInlineStart={5} paddingInlineEnd={4} fontWeight={600}>
                  {project.org}
                </Td>
                <Td paddingInlineStart={4} paddingInlineEnd={4}>
                  <Link href={`https://${project.website}`} isExternal>
                    {project.website}
                  </Link>
                </Td>
                <Td paddingInlineStart={4} paddingInlineEnd={4}>
                  <Link href={`mailto:${project.email}`} isExternal>
                    {project.email}
                  </Link>
                </Td>
                <Td paddingInlineStart={4} paddingInlineEnd={4}>
                  {dateToString(project.started)}
                </Td>
                <Td paddingInlineStart={4} paddingInlineEnd={4}>
                  {dateToString(project.lastUpdated)}
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
                        <Box as="button" width="100%" onClick={onOpen}>
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
          </Tbody>
        </Table>
      </>
    );
  }
  
  export default ChapterTable;
