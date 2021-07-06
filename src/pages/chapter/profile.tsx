import {
  Flex,
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Spacer,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

function ChapterProfilePage() {
  return (
    <Flex
      height="100%"
      justifyContent="center"
      alignItems="stretch"
      backgroundColor="#EBEEF1"
      overflow="auto"
    >
      <VStack margin={50}>
        <Text
          alignSelf="flex-start"
          p={1}
          fontSize="xx-large"
          fontWeight={700}
          color={"black.400"}
        >
          {"Profile"}
        </Text>
        <Flex
          minW={800}
          minH={1200}
          border="1px solid #657788"
          borderRadius={10}
          backgroundColor="white"
          justifyContent="center"
        >
          <VStack margin={50} w={650}>
            <Avatar width="80px" height="80px" marginBottom={50} />
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight={700}
              color={"black.400"}
            >
              {"Chapter Information"}
            </Text>
            <Flex flexDirection="column" w={640} h={270}>
              <Flex justifyContent="space-between">
                <FormControl id="name">
                  <FormLabel fontSize="sm">Chapter Name</FormLabel>
                  <Input type="name" width={299} />
                </FormControl>
                <FormControl id="url">
                  <FormLabel fontSize="sm">Website URL (Optional)</FormLabel>
                  <Input type="url" width={299} />
                </FormControl>
              </Flex>
              <Spacer />
              <Flex>
                <FormControl id="location">
                  <FormLabel fontSize="sm">Location</FormLabel>
                  <Input type="location" width={299} />
                </FormControl>
                <FormControl id="url">
                  <FormLabel fontSize="sm">Facebook URL (Optional)</FormLabel>
                  <Input type="url" width={299} />
                </FormControl>
              </Flex>
              <Spacer />
              <Flex>
                <FormControl id="email">
                  <FormLabel fontSize="sm">Contact</FormLabel>
                  <Input type="email" width={299} />
                </FormControl>
                <FormControl id="url">
                  <FormLabel fontSize="sm">Instagram URL (Optional)</FormLabel>
                  <Input type="url" width={299} />
                </FormControl>
              </Flex>
            </Flex>
            {/* <Spacer /> */}
            <Text
              alignSelf="flex-start"
              fontSize="sm"
              fontWeight={500}
              color={"black.400"}
            >
              {"Chapter Products"}
            </Text>
            <Flex alignSelf="flex-start">
              <CheckboxGroup>
                <HStack spacing={10} direction="row">
                  <Checkbox size="md">Websites</Checkbox>
                  <Checkbox size="md">Web Apps</Checkbox>
                  <Checkbox size="md">Mobile Apps</Checkbox>
                </HStack>
              </CheckboxGroup>
            </Flex>
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight={700}
              color={"black.400"}
            >
              Project Process Customization
            </Text>
            <Text
              alignSelf="flex-start"
              fontSize="s"
              fontWeight={400}
              color={"grey"}
            >
              Customize which parts of the project application, development, and
              handoff process you would like displayed to nonprofits.
            </Text>
            <Flex alignSelf="flex-start">
              <CheckboxGroup>
                <VStack>
                  <Checkbox size="md">Application</Checkbox>
                  <Checkbox size="md">Interview</Checkbox>
                  <Checkbox size="md">In-Progress [Required]</Checkbox>
                  <Checkbox size="md">Completed [Required]</Checkbox>
                  <Checkbox size="md">Feedback</Checkbox>
                  <Checkbox size="md">Maintenance [Required]</Checkbox>
                </VStack>
              </CheckboxGroup>
            </Flex>
          </VStack>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default ChapterProfilePage;
