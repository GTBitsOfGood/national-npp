/* eslint-disable react/forbid-elements */
import {
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Checkbox,
  CheckboxGroup,
  Select,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { states, countries } from "src/utils/constants";

function ChapterProfilePage() {
  //admin info
  const [nameAdmin, setNameAdmin] = useState<string>("");
  const [calendly, setCalendly] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  //chapter info
  const [name, setName] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const [contact, setContact] = useState<string>("");
  const [projectLimit, setProjectLimit] = useState<number>(NaN);
  const [website, setWebsite] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [chapterProjects, setChapterProjects] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [projectProcessCustomization, setprojectProcessCustomization] =
    useState<boolean[]>([false, false, true, true, false, true]);

  // const stateOptions = states.map((state, idx) => {
  //   <option key={idx} value={state}>
  //     {state}
  //   </option>;
  // });

  // const countryOptions = countries.map((country, idx) => {
  //   <option key={idx} value={country}>
  //     {country}
  //   </option>;
  // });
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
          minW={{ base: 425, md: 850 }}
          minH={{ base: 2000, md: 1300 }}
          border="1px solid #657788"
          borderRadius={10}
          backgroundColor="white"
          justifyContent={{ base: "none", md: "center" }}
          alignContent={{ base: "center", md: "none" }}
        >
          <VStack margin={50} w={{ base: 240, md: 680 }}>
            <Avatar width="80px" height="80px" marginBottom={50} />
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight={700}
              color={"black.400"}
            >
              {"User Information"}
            </Text>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              w={{ base: 240, md: 680 }}
              h={{ base: 300, md: 220 }}
            >
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                marginBottom={10}
              >
                <FormControl id="name">
                  <FormLabel fontSize="sm">Name</FormLabel>
                  <Input
                    type="name"
                    fontSize="sm"
                    width={320}
                    placeholder="Full Name"
                    value={nameAdmin}
                    onChangeText={setNameAdmin}
                    marginBottom={6}
                  />
                </FormControl>
                <FormControl id="url">
                  <FormLabel fontSize="sm">Calendly Link</FormLabel>
                  <Input
                    type="email"
                    fontSize="sm"
                    width={320}
                    placeholder="calendly.com/"
                    value={calendly}
                    onChangeText={setCalendly}
                  />
                </FormControl>
              </Flex>
              <Spacer />
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
              >
                <FormControl id="phone number">
                  <FormLabel fontSize="sm">Phone Number (Optional)</FormLabel>
                  <Input
                    type="phone number"
                    fontSize="sm"
                    width={320}
                    placeholder="(XXX) XXX-XXXX"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </FormControl>
              </Flex>
            </Flex>
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight={700}
              color={"black.400"}
            >
              {"Chapter Information"}
            </Text>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              w={{ base: 240, md: 680 }}
              h={{ base: 880, md: 440 }}
            >
              <Flex flexDirection="column" justifyContent="space-between">
                <FormControl id="name">
                  <FormLabel fontSize="sm">Chapter Name</FormLabel>
                  <Input
                    type="name"
                    fontSize="sm"
                    width={320}
                    placeholder="Chapter Name"
                    value={name}
                    onChangeText={setName}
                    marginBottom={6}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel fontSize="sm">Contact</FormLabel>
                  <Input
                    type="email"
                    fontSize="sm"
                    width={320}
                    placeholder="chapter@email.com"
                    value={contact}
                    onChangeText={setContact}
                    marginBottom={6}
                  />
                </FormControl>
                <FormControl id="location">
                  <FormLabel fontSize="sm">Location</FormLabel>
                  <Input
                    type="street"
                    fontSize="sm"
                    width={320}
                    placeholder="Street"
                    value={street}
                    onChangeText={setStreet}
                    marginBottom={4}
                  />
                  <Input
                    type="city"
                    fontSize="sm"
                    width={320}
                    placeholder="City"
                    value={city}
                    onChangeText={setCity}
                    marginBottom={4}
                  />
                  <HStack marginBottom={4}>
                    <Select
                      fontSize="sm"
                      width={191}
                      placeholder="Select State"
                    >
                      {/* {stateOptions} */}
                    </Select>
                    <Input
                      type="zip code"
                      fontSize="sm"
                      width={120}
                      placeholder="ZIP"
                      value={zip}
                      onChangeText={setZip}
                    />
                  </HStack>
                  <Select
                    fontSize="sm"
                    width={320}
                    placeholder="Select Country"
                  >
                    {/* {countryOptions} */}
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
                    width={320}
                    placeholder="chapter.org"
                    value={website}
                    onChangeText={setWebsite}
                    marginBottom={6}
                  />
                </FormControl>
                <FormControl id="url">
                  <FormLabel fontSize="sm">Facebook URL (Optional)</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={320}
                    placeholder="facebook.com/"
                    value={facebook}
                    onChangeText={setFacebook}
                    marginBottom={6}
                  />
                </FormControl>
                <FormControl id="url">
                  <FormLabel fontSize="sm">Instagram URL (Optional)</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={320}
                    placeholder="instagram.com/"
                    value={instagram}
                    onChangeText={setInstagram}
                    marginBottom={5}
                  />
                </FormControl>
                <FormControl id="number">
                  <FormLabel fontSize="sm">Project Limit</FormLabel>
                  <Input
                    type="number"
                    fontSize="sm"
                    width={320}
                    placeholder="Enter a number"
                    value={projectLimit}
                    onChangeText={setProjectLimit}
                    marginBottom={5}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Chapter Products</FormLabel>
                  <CheckboxGroup>
                    <HStack w={320}>
                      <Checkbox
                        size="md"
                        isChecked={chapterProjects[0]}
                        onChange={(e) =>
                          setChapterProjects([
                            e.target.checked,
                            chapterProjects[1],
                            chapterProjects[2],
                          ])
                        }
                      >
                        Websites
                      </Checkbox>
                      <Checkbox
                        size="md"
                        isChecked={chapterProjects[1]}
                        onChange={(e) =>
                          setChapterProjects([
                            chapterProjects[0],
                            e.target.checked,
                            chapterProjects[2],
                          ])
                        }
                      >
                        Web Apps
                      </Checkbox>
                      <Checkbox
                        size="md"
                        isChecked={chapterProjects[2]}
                        onChange={(e) =>
                          setChapterProjects([
                            chapterProjects[0],
                            chapterProjects[1],
                            e.target.checked,
                          ])
                        }
                      >
                        Mobile Apps
                      </Checkbox>
                    </HStack>
                  </CheckboxGroup>
                </FormControl>
              </Flex>
            </Flex>
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Flex
              flexDirection="column"
              w={{ base: 240, md: 680 }}
              h={{ base: 880, md: 440 }}
            >
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
                    <Flex flexDirection="column" paddingTop={6}>
                      <Checkbox
                        size="md"
                        isChecked={projectProcessCustomization[0]}
                        onChange={(e) =>
                          setChapterProjects([
                            e.target.checked,
                            chapterProjects[1],
                            chapterProjects[2],
                            chapterProjects[3],
                            chapterProjects[4],
                            chapterProjects[5],
                          ])
                        }
                      >
                        Application
                      </Checkbox>
                      <Checkbox
                        size="md"
                        paddingTop={2}
                        isChecked={projectProcessCustomization[1]}
                        onChange={(e) =>
                          setChapterProjects([
                            chapterProjects[0],
                            e.target.checked,
                            chapterProjects[2],
                            chapterProjects[3],
                            chapterProjects[4],
                            chapterProjects[5],
                          ])
                        }
                      >
                        Interview
                      </Checkbox>
                      <Checkbox
                        size="md"
                        paddingTop={2}
                        isDisabled
                        defaultIsChecked
                      >
                        In-Progress [Required]
                      </Checkbox>
                      <Checkbox
                        size="md"
                        paddingTop={2}
                        isDisabled
                        defaultIsChecked
                      >
                        Completed [Required]
                      </Checkbox>
                      <Checkbox
                        size="md"
                        paddingTop={2}
                        isChecked={projectProcessCustomization[4]}
                        onChange={(e) =>
                          setChapterProjects([
                            chapterProjects[0],
                            chapterProjects[1],
                            chapterProjects[2],
                            chapterProjects[3],
                            e.target.checked,
                            chapterProjects[5],
                          ])
                        }
                      >
                        Feedback
                      </Checkbox>
                      <Checkbox
                        size="md"
                        paddingTop={2}
                        isDisabled
                        defaultIsChecked
                      >
                        Maintenance [Required]
                      </Checkbox>
                    </Flex>
                  </CheckboxGroup>
                </Flex>
              </FormControl>
            </Flex>
            <Flex
              flexDirection="row"
              alignSelf={{ base: "center", md: "flex-end" }}
            >
              <Button size="md" colorScheme="blue">
                Save Changes
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default ChapterProfilePage;
