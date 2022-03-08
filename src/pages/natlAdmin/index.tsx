import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Types } from "mongoose";
import { useEffect, useState } from "react";
import { natlAdminGetChapters } from "src/actions/NatlAdmin";
import AdminTable from "src/components/natlAdmin/AdminTable";
import { showError } from "src/utils/notifications";
import { Chapter, MaintenanceType, Nonprofit } from "src/utils/types";

function NatlAdminDelete() {
  //const chapters: Chapter[] = [];
  const nonprofits: Nonprofit[] = [];

  const [chapters, setChapters] = useState<Chapter[]>();

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

  /*for (let i = 0; i < 10; i += 1) {
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
  }*/

  

  /*nonprofits.push({
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
  });*/

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
        <Box 
          flexGrow={1} 
          flex="1 1 auto"
          border="1px solid #E2E8F0"
          borderRadius={10}
          display="flex" 
          flexDirection="column"
          overflowX="hidden"
          overflowY="auto"
        >
          <AdminTable chapters={chapters} chapterIsActive={true} /> 
        </Box>
      </Flex>
    </Flex>
  );
}

export default NatlAdminDelete;
