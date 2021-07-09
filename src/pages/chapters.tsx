import { Heading, Button, Box, Grid } from "@chakra-ui/react";
import { useState } from "react";
import ChapterCard from "src/components/chapters/ChapterCard";
import { ProjectType } from "src/utils/types";

function ChapterSelectPage() {
  const [selected, setSelected] = useState("");
  const chapters = [];

  for (let i = 0; i < 10; i += 1) {
    chapters.push({
      _id: `${i}`,
      name: "Georgia Tech",
      email: "gt@hack4impact.org",
      address: {
        street: "7 Fake Street",
        city: "Atlanta",
        state: "GA",
        zipCode: "30303",
        country: "USA",
      },
      projectProcess: [],
      projectTypes: [ProjectType.WEBSITE, ProjectType.MOBILE_APP],
      projectLimit: 5,
      website: "bitsofgood.org",
      facebook: "bitsofgood",
      instagram: "bitsofgood",
    });
  }

  chapters.push({
    _id: `${2000}`,
    name: "University of Illinois at Urbana-Champaign",
    email: "gt@hack4impact.org",
    address: {
      street: "7 Fake Street",
      city: "Champaign",
      state: "IL",
      zipCode: "61820",
      country: "USA",
    },
    projectProcess: [],
    projectTypes: [ProjectType.WEBSITE, ProjectType.MOBILE_APP],
    projectLimit: 3,
    website: "bitsofgood.org",
    facebook: "bitsofgood",
    instagram: "bitsofgood",
  });

  function onChapterCardClick(id: string) {
    setSelected(id);
  }

  return (
    <Box height="100%" backgroundColor="#EBEEF1" overflow="auto">
      <Box
        boxSizing="border-box"
        padding="50px"
        maxWidth="1420px"
        margin="auto"
      >
        <Heading
          fontSize={{ base: "x-large", md: "xx-large" }}
          marginBottom="50px"
        >
          Select a chapter to work with
        </Heading>
        <Grid
          gridTemplateColumns="repeat(auto-fill, 400px)"
          columnGap="60px"
          rowGap="40px"
        >
          <ChapterCard
            key={""}
            isSelected={selected === ""}
            onClick={onChapterCardClick}
          />
          {chapters.map((chapter) => (
            <ChapterCard
              key={chapter._id}
              chapter={chapter}
              isSelected={chapter._id === selected}
              onClick={onChapterCardClick}
            />
          ))}
        </Grid>
        <Box align="right" marginTop="40px">
          <Button px="20px" colorScheme="blue">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default ChapterSelectPage;
