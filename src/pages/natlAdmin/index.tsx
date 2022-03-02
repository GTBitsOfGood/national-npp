import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { Types } from "mongoose";
import AdminTable from "src/components/natlAdmin/AdminTable";
import { Chapter, MaintenanceType, Nonprofit } from "src/utils/types";

function NatlAdminDelete() {
  const chapters: Chapter[] = [];
  const nonprofits: Nonprofit[] = [];

  for (let i = 0; i < 10; i += 1) {
    chapters.push({
      _id: new Types.ObjectId(),
      name: "BitsofGood",
      website: "bitsofgood1.org",
      email: "gt@hack4impact1.org",
      contact: {
        _id: new Types.ObjectId(),
        id: "123",
        email: "bog.org",
        emailVerified: new Date(),
        name: "Bog contact",
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      address: {
        street: "Bstr",
        city: "Bci",
        state: "Bsta",
        zipCode: "Bzip",
        country: "Bco",
      },
      maintenanceTypes: new Array<MaintenanceType>(),
      maintenancePeriod: 1,
    });
  }

  nonprofits.push({
    _id: new Types.ObjectId(),
    name: "Hack4Impact",
    website: "hack4impact.org",
    contact: {
      _id: new Types.ObjectId(),
      id: "456",
      email: "bog2.org",
      emailVerified: new Date(),
      name: "Bog contact2",
      roles: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    isVerified: false,
    address: {
      street: "Str",
      city: "C",
      state: "Sta",
      zipCode: "Z",
      country: "Co",
    },
  });

  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent="flex-start"
      alignItems="stretch"
      overflow="auto"
    >
      <Flex
        minH="600px"
        margin={50}
        padding={50}
        border="1px solid #657788"
        borderRadius={10}
        backgroundColor="surface"
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
                color: "primary",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              Chapters
            </Tab>
            <Tab
              width={120}
              height={50}
              backgroundColor="surface"
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              border="1px solid none"
              borderBottom="none"
              fontWeight={600}
              _selected={{
                border: "1px solid #E2E8F0",
                color: "primary",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              Nonprofits
            </Tab>
          </TabList>

          <TabPanels
            backgroundColor="surface"
            border="1px solid #E2E8F0"
            borderBottomLeftRadius={10}
            borderTopRightRadius={10}
            borderBottomRightRadius={10}
            flex="1 1 auto"
            overflowX="hidden"
            overflowY="auto"
          >
            <TabPanel paddingTop={0}>
              <AdminTable chapters={chapters} chapterIsActive={true} />
            </TabPanel>
            <TabPanel paddingTop={0}>
              <AdminTable nonprofits={nonprofits} chapterIsActive={false} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}

export default NatlAdminDelete;
