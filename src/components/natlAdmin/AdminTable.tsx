import { Link, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import type { Chapter, Nonprofit, User } from "src/utils/types";

interface Props {
  chapters?: Chapter[];
  nonprofits?: Nonprofit[];
  chapterIsActive: boolean;
}

function AdminTable({ chapters, nonprofits, chapterIsActive }: Props) {
  return (
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
                </Tr>
              ))}
          </>
        )}
      </Tbody>
    </Table>
  );
}

export default AdminTable;
