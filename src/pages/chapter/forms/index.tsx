import { Heading, Button, HStack, Text, Flex } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import FormCard from "src/components/FormCard";
import { FormType } from "src/utils/types";

// TODO: Remove these when real data available
const forms = [
  {
    _id: `1`,
    name: "Application Form 1",
    type: FormType.APPLICATION,
    updatedAt: new Date(),
  },
  {
    _id: `2`,
    name: "Application Form 2",
    type: FormType.APPLICATION,
    updatedAt: new Date(),
  },
  {
    _id: `3`,
    name: "Feedback Form 1",
    type: FormType.FEEDBACK,
    updatedAt: new Date(),
  },
  {
    _id: `4`,
    name: "Application Form 1",
    type: FormType.APPLICATION,
    updatedAt: new Date(),
  },
  {
    _id: `5`,
    name: "Application Form 2",
    type: FormType.APPLICATION,
    updatedAt: new Date(),
  },
  {
    _id: `6`,
    name: "Feedback Form 1",
    type: FormType.FEEDBACK,
    updatedAt: new Date(),
  },
  {
    _id: `7`,
    name: "Feedback Form 2",
    type: FormType.FEEDBACK,
    updatedAt: new Date(),
  },
  {
    _id: `8`,
    name: "Feedback Form 3",
    type: FormType.FEEDBACK,
    updatedAt: new Date(),
  },
  {
    _id: `9`,
    name: "Feedback Form 4",
    type: FormType.FEEDBACK,
    updatedAt: new Date(),
  },
];

function ChapterFormsPage() {
  return (
    <Flex height="100%" backgroundColor="#EBEEF1" overflow="auto">
      <Flex
        direction="column"
        my="30px"
        flex="0 1 1000px"
        minW="800px"
        minH="700px"
        marginX="auto"
      >
        <Heading
          fontSize={{ base: "x-large", md: "xx-large" }}
          marginBottom="30px"
          ml="10px"
        >
          Chapter Forms
        </Heading>
        <Flex
          direction="column"
          bgColor="white"
          flex="1"
          p="30px"
          border="1px solid #657788"
          borderRadius="15px"
          overflow="hidden"
        >
          <Flex alignSelf="flex-end" mb="30px">
            <Button colorScheme="blue">
              <HStack>
                <GoPlus color="white" />
                <Text>Create New Form</Text>
              </HStack>
            </Button>
          </Flex>
          <Flex
            direction="column"
            flex="1"
            border="1px solid #EBEEF1"
            borderRadius="15px"
            overflow="auto"
          >
            {forms.map((form) => (
              <FormCard
                key={form._id}
                name={form.name}
                updatedAt={form.updatedAt}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ChapterFormsPage;
