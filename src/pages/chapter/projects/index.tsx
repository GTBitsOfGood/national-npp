import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import ChapterProjectsTable from "src/components/chapter/projects/ChapterProjectsTable";

function ChapterProjects() {
  const projects = [
    {
      id: "123",
      org: "Bits of Good",
      website: "bitsofgood.org",
      email: "gt@hack4impact.org",
      started: new Date(),
      lastUpdated: new Date(),
      status: "newApp",
    },
    {
      id: "456",
      org: "Hack4Impact",
      website: "hack4impact.org",
      email: "hello@hack4impact.org",
      started: new Date(),
      lastUpdated: new Date(),
      status: "rejected",
    },
  ];

  const closedFilter = (status: string) =>
    status === "delivered" || status === "rejected" || status === "cancelled";

  const activeProjects = projects.filter((p) => !closedFilter(p.status));
  const closedProjects = projects.filter((p) => closedFilter(p.status));

  return (
    <Flex
      height="100%"
      justifyContent="center"
      alignItems="stretch"
      backgroundColor="#EBEEF1"
    >
      <Flex
        justifyContent="center"
        alignItems="stretch"
        flexDirection="column"
        margin={50}
        padding={50}
        flex={1}
        border="1px solid #657788"
        borderRadius={10}
        backgroundColor="white"
      >
        <Tabs height="100%" display="flex" flexDirection="column">
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
            flex="1 1"
          >
            <TabPanel>
              <ChapterProjectsTable projects={activeProjects} />
            </TabPanel>
            <TabPanel>
              <ChapterProjectsTable projects={closedProjects} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}

export default ChapterProjects;
