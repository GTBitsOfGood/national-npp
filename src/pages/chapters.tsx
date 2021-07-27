import { Heading, Button, Box, Grid } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useState } from "react";
import { getChapters } from "src/actions/Chapter";
import ChapterCard from "src/components/chapters/ChapterCard";
import { Chapter } from "src/utils/types";

function ChapterSelectPage({ chapters }: { chapters: Array<Chapter> }) {
  const [selected, setSelected] = useState("");

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
          {chapters.map((chapter: Chapter) => (
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

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const chapters = await getChapters();

  return {
    props: {
      chapters,
    },
  };
};

export default ChapterSelectPage;
