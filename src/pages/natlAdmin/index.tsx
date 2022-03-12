import { Flex, Box, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  natlAdminGetChapters,
  natlAdminGetNonprofits,
  natlAdminGetProjects,
} from "src/actions/NatlAdmin";
import AdminTable from "src/components/natlAdmin/AdminTable";
import { showError } from "src/utils/notifications";
import { Chapter, Nonprofit, Project } from "src/utils/types";

function NatlAdminDelete() {
  const [chapters, setChapters] = useState<Chapter[]>();
  const [projects, setProjects] = useState<Project[]>();
  const [nonprofits, setNonprofits] = useState<Nonprofit[]>();

  useEffect(() => {
    async function loadChapters() {
      const newChapters: Chapter[] = await natlAdminGetChapters();

      setChapters(newChapters);
    }

    loadChapters().catch((e) => {
      const error = e as Error;
      showError(error.message);
    });
  }, []);

  useEffect(() => {
    async function loadProjects() {
      const newProjects: Project[] = await natlAdminGetProjects();

      setProjects(newProjects);
    }

    loadProjects().catch((e) => {
      const error = e as Error;
      showError(error.message);
    });
  }, []);

  useEffect(() => {
    async function loadNonprofits() {
      const newNonprofits: Nonprofit[] = await natlAdminGetNonprofits();

      setNonprofits(newNonprofits);
    }

    loadNonprofits().catch((e) => {
      const error = e as Error;
      showError(error.message);
    });
  }, []);

  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent="flex-start"
      alignItems="stretch"
      overflow="auto"
    >
      <VStack align="stretch" marginBottom={15} flexGrow={1} padding={50} spacing="40px" justifyContent="center">
        <Heading fontSize={{ base: "2xl", md: "3xl" }} paddingLeft="20px">
          Chapters
        </Heading>
        <Flex
          minH="600px"
          margin={10}
          padding={50}
          border="1px solid #657788"
          borderRadius={10}
          backgroundColor="surface"
          flexShrink={0}
          flexGrow={1}
          justifyContent="center"
          alignItems="stretch"
        >
          <Box
            flexGrow={1}
            flex="1 1 auto"
            border="1px solid #E2E8F0"
            borderRadius={10}
            display="flex"
            flexDirection="column"
            overflowX="hidden"
            overflowY="auto"
            maxHeight="500px"
          >
            <AdminTable chapters={chapters} projects={projects} />
          </Box>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default NatlAdminDelete;
