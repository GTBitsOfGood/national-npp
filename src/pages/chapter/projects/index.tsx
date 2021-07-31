import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";
import { getChapterProjects } from "src/actions/Project";
import ChapterProjectsTable from "src/components/chapter/projects/ChapterProjectsTable";
import { ChapterStage, Project } from "src/utils/types";

function ChapterProjects({ projects }: { projects: Array<Project> }) {
  projects = [];

  for (let i = 0; i < 10; i += 1) {
    projects.push({
      id: "123",
      org: "Bits of Good",
      website: "bitsofgood.org",
      email: "gt@hack4impact.org",
      started: new Date(),
      lastUpdated: new Date(),
      status: ChapterStage.MEETING_CONTACT,
    });
  }

  projects.push({
    id: "456",
    org: "Hack4Impact",
    website: "hack4impact.org",
    email: "hello@hack4impact.org",
    started: new Date(),
    lastUpdated: new Date(),
    status: ChapterStage.REJECTED,
  });

  const closedFilter = (status: string) =>
    status === "delivered" || status === "rejected" || status === "cancelled";

  const activeProjects = projects.filter((p) => !closedFilter(p.status));
  const closedProjects = projects.filter((p) => closedFilter(p.status));

  return (
    <Flex
      height="100%"
      justifyContent="flex-start"
      alignItems="stretch"
      backgroundColor="#EBEEF1"
      overflow="auto"
    >
      <Flex
        margin={50}
        padding={50}
        border="1px solid #657788"
        borderRadius={10}
        backgroundColor="white"
        flexShrink={0}
        flexGrow={1}
        justifyContent="center"
        alignItems="stretch"
      >
        <Tabs flexGrow={1} display="flex" flexDirection="column">
          <TabList flex="0 0" borderBottom="none">
            <Tab
              width={120}
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              border="1px solid none"
              borderBottom="none"
              fontWeight={600}
              _selected={{
                border: "1px solid #E2E8F0",
                color: "#0069CA",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              Active
            </Tab>
            <Tab
              width={120}
              height={50}
              backgroundColor="white"
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              border="1px solid none"
              borderBottom="none"
              fontWeight={600}
              _selected={{
                border: "1px solid #E2E8F0",
                color: "#0069CA",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              Closed
            </Tab>
          </TabList>

          <TabPanels
            backgroundColor="white"
            border="1px solid #E2E8F0"
            borderBottomLeftRadius={10}
            borderTopRightRadius={10}
            borderBottomRightRadius={10}
            flex="1 1 auto"
            overflowX="hidden"
            overflowY="auto"
          >
            <TabPanel paddingTop={0}>
              <ChapterProjectsTable projects={activeProjects} />
            </TabPanel>
            <TabPanel paddingTop={0}>
              <ChapterProjectsTable projects={closedProjects} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const projects = await getChapterProjects();
  // TODO needs chapter role & project created

  if (!session || !projects) {
    return {
      redirect: {
        destination: "/src/pages/login.tsx",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        projects,
      },
    };
  }
};

export default ChapterProjects;
