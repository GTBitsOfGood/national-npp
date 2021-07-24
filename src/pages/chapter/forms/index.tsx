import { AddIcon } from "@chakra-ui/icons";
import { Heading, Box, Button, HStack, Text } from "@chakra-ui/react";
import FormCard from "src/components/FormCard";
import { FormType } from "src/utils/types";

function ChapterFormsPage() {
  const forms = [
    {
      _id: `1`,
      name: "Application Form 1",
      type: FormType.APPLICATION,
    },
    {
      _id: `2`,
      name: "Application Form 2",
      type: FormType.APPLICATION,
    },
    {
      _id: `3`,
      name: "Feedback Form 1",
      type: FormType.FEEDBACK,
    },
    {
      _id: `4`,
      name: "Application Form 1",
      type: FormType.APPLICATION,
    },
    {
      _id: `5`,
      name: "Application Form 2",
      type: FormType.APPLICATION,
    },
    {
      _id: `6`,
      name: "Feedback Form 1",
      type: FormType.FEEDBACK,
    },
  ];
  return (
    <Box height="100%" backgroundColor="#EBEEF1" overflow="auto">
      <Box
        display="table"
        boxSizing="border-box"
        padding="40px 40px 40px 40px"
        justifyContent="center"
        alignItems="center"
        margin="auto"
        align="center"
      >
        <Box width="1000px">
          <Heading
            fontSize={{ base: "x-large", md: "xx-large" }}
            marginBottom="30px"
            align="left"
          >
            My Forms
          </Heading>
        </Box>

        <Box
          flexDirection="column"
          width="1000px"
          height="550px"
          padding="30px"
          backgroundColor="white"
          border="1px"
          borderColor="#657788"
          borderRadius="15px"
        >
          <Box align="right" marginBottom="30px">
            <Button colorScheme="blue">
              <HStack>
                <AddIcon />
                <Text>Create New Form</Text>
              </HStack>
            </Button>
          </Box>
          <Box
            flexDirection="column"
            width="900px"
            height="400px"
            backgroundColor="white"
            border="1px"
            borderRadius="15px"
            borderColor="#EBEEF1"
            overflow="scroll"
          >
            {forms.map((form) => (
              <FormCard key={form._id} name={form.name} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ChapterFormsPage;
