/* eslint-disable react/forbid-elements */
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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

function ChapterProfilePage() {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [projectLimit, setProjectLimit] = useState<number>(NaN);
  const [website, setWebsite] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [chapterProjects, setChapterProjects] = useState<string[]>([]);
  const [projectProcessCustomization, setprojectProcessCustomization] =
    useState<string[]>([
      "In-Progress [Required]",
      "Completed [Required]",
      "Maintenance [Required]",
    ]);

  const [profileUpdate, setProfileUpdate] = useState<boolean>(false);

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
          minH={950}
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
            <Flex flexDirection="row" w={640} h={370}>
              <Flex flexDirection="column" justifyContent="space-between">
                <FormControl id="name">
                  <FormLabel fontSize="sm">Chapter Name</FormLabel>
                  <Input
                    type="name"
                    fontSize="sm"
                    width={299}
                    placeholder="Chapter Name"
                    value={name}
                    onChangeText={setName}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel fontSize="sm">Contact</FormLabel>
                  <Input
                    type="email"
                    fontSize="sm"
                    width={299}
                    placeholder="chapter@email.com"
                    value={contact}
                    onChangeText={setContact}
                  />
                </FormControl>
                <FormControl id="location">
                  <FormLabel fontSize="sm">Location</FormLabel>
                  <Input
                    type="street"
                    fontSize="sm"
                    width={299}
                    placeholder="Street"
                    value={location}
                    onChangeText={setLocation}
                  />
                  <Input
                    type="city"
                    fontSize="sm"
                    width={299}
                    placeholder="City"
                    value={location}
                    onChangeText={setLocation}
                  />
                  <HStack>
                    <Select
                      fontSize="sm"
                      width={191}
                      placeholder="Select State"
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                    <Input
                      type="zip code"
                      fontSize="sm"
                      width={100}
                      placeholder="ZIP"
                      value={location}
                      onChangeText={setLocation}
                    />
                  </HStack>
                  <Select
                    fontSize="sm"
                    width={299}
                    placeholder="Select Country"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>
              </Flex>
              <Spacer />
              <Flex flexDirection="column" justifyContent="space-between">
                <FormControl id="url">
                  <FormLabel fontSize="sm">Website URL (Optional)</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={299}
                    placeholder="chapter.org"
                    value={website}
                    onChangeText={setWebsite}
                  />
                </FormControl>
                <FormControl id="url">
                  <FormLabel fontSize="sm">Facebook URL (Optional)</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={299}
                    placeholder="facebook.com/"
                    value={facebook}
                    onChangeText={setFacebook}
                  />
                </FormControl>
                <FormControl id="url">
                  <FormLabel fontSize="sm">Instagram URL (Optional)</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={299}
                    placeholder="instagram.com/"
                    value={instagram}
                    onChangeText={setInstagram}
                  />
                </FormControl>
                <FormControl id="number">
                  <FormLabel fontSize="sm">Project Limit</FormLabel>
                  <Input
                    type="number"
                    fontSize="sm"
                    width={299}
                    placeholder="Enter a number"
                    value={projectLimit}
                    onChangeText={setProjectLimit}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Chapter Products</FormLabel>
                  <CheckboxGroup>
                    <HStack marginTop={3}>
                      <Checkbox size="md">Websites</Checkbox>
                      <Checkbox size="md">Web Apps</Checkbox>
                      <Checkbox size="md">Mobile Apps</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                </FormControl>
              </Flex>
            </Flex>
            <Spacer />
            <Flex direction={"column"}>
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
                Customize which parts of the project application, development,
                and handoff process you would like displayed to nonprofits.
              </Text>
              <FormControl>
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
              </FormControl>
            </Flex>
          </VStack>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default ChapterProfilePage;
