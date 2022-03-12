import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import React from "react";
import type { Chapter, Project } from "src/utils/types";
import AdminTableRow from "./AdminTableRow";

interface Props {
  chapters?: Chapter[];
  projects?: Project[];
}

function AdminTable({ chapters, projects }: Props) {
  return (
    <>
      <Table variant="unstyled" size="lg">
        <Thead color="#999999" borderBottom="1px solid #E2E8F0">
          <Tr height="100px">
            <Th paddingInlineStart={10} paddingInlineEnd={4}>
              ORGANIZATION
            </Th>
            <Th paddingInlineStart={4} paddingInlineEnd={4}>
              WEBSITE
            </Th>
            <Th paddingInlineStart={4} paddingInlineEnd={4}>
              CONTACT EMAIL
            </Th>
            <Th paddingInlineStart={4} paddingInlineEnd={4}>
              NON-PROFITS
            </Th>
          </Tr>
        </Thead>
        <Tbody overflowY="auto">
          {chapters && 
            chapters.map((chapter) => (
              <AdminTableRow 
                key={chapter.name} 
                chapter={chapter} 
                chapterProjects={
                  projects?.filter(
                    (p) => p.chapter && chapters && (
                      (p.chapter as Chapter)._id === (chapter as Chapter)._id)
                    )
                }/>
            ))}
        </Tbody>
      </Table>
    </>
  );
}

export default AdminTable;
