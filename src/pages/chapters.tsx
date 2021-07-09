import { Flex, Heading, Button, Box } from "@chakra-ui/react";
import React from "react";
import ChapterCard from "src/components/ChapterCard";

function ChapterSelectPage() {
  // const [cardItems, setCardItems] = React.useState([]);

  // React.useEffect(() => {
  // 	fetch('')
  // 	.then(response => response.json())
  //   .then(data => setCardItems(data))
  //   .catch(error => {
  //     console.error(error)
  //   })
  //   }, [])

  return (
    <Flex
      p={{ base: 5, md: 10 }}
      direction="column"
      alignItems="space-between"
      justifyContent="flex-start"
      backgroundColor="gray.100"
      height="100%"
    >
      <Box align="left">
        <Heading fontSize={{ base: "medium", md: "x-large" }} marginBottom="5">
          Select a chapter to work with
        </Heading>
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        spacing="2"
        marginBottom="5"
        flexWrap="wrap"
      >
        <ChapterCard />
      </Flex>
      <Box align="right">
        <Button colorScheme="blue">Next</Button>
      </Box>
    </Flex>
  );
}
export default ChapterSelectPage;
