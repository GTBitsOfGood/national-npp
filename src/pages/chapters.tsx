import { Heading, Button, Box, Grid } from "@chakra-ui/react";
import { useState } from "react";
import ChapterCard from "src/components/chapters/ChapterCard";

function ChapterSelectPage() {
  const [selected, setSelected] = useState("");
  const chapters = [];

  for (let i = 0; i < 10; i += 1) {
    chapters.push({
      id: `${i}`,
      school: "Georgia Tech",
      location: "Atlanta, GA",
      projectTypes: ["Website", "Mobile"],
      email: "gt@hack4impact.org",
      website: "bitsofgood.org",
      facebook: "bitsofgood",
      instagram: "bitsofgood",
      open: true,
    });
  }

  chapters.push({
    id: `${2000}`,
    school: "University of Illinois at Urbana-Champaign",
    location: "Champaign, IL",
    projectTypes: ["Website", "Mobile"],
    email: "gt@hack4impact.org",
    website: "bitsofgood.org",
    facebook: "bitsofgood",
    instagram: "bitsofgood",
    open: false,
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
              key={chapter.id}
              chapter={chapter}
              isSelected={chapter.id === selected}
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
