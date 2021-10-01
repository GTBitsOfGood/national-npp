import {
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
  Select,
  Button,
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "src/actions/User";
import { states, countries, maintenanceUnits } from "src/utils/constants";
import {
  NonprofitStage,
  ProjectType,
  UserUpdate,
  ChapterUpdate,
  MaintenanceType,
  Chapter,
} from "src/utils/types";

const requiredStages = [NonprofitStage.IN_PROGRESS, NonprofitStage.COMPLETE];

function ChapterProfilePage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [chapterName, setChapterName] = useState("");
  const [contact, setContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(states[0]);
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState(countries[0]);
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(true);
  const [maintenanceType, setMaintenanceType] = useState<MaintenanceType[]>([]);
  const [maintenanceDuration, setMaintenanceDuration] = useState(1);
  const [maintenanceUnit, setMaintenanceUnit] = useState("month");
  useEffect(() => {
    async function preloadFields() {
      const user = await getUserProfile();
      if (user.name) {
        setName(user.name);
      }
      if (user.phoneNum) {
        setPhoneNumber(user.phoneNum);
      }

      const chapter = user.chapter as Chapter;
      setChapterName(chapter.name);
      setContact(chapter.contact);
      setStreet(chapter.address.street);
      setCity(chapter.address.city);
      setState(chapter.address.state);
      setZip(chapter.address.zipCode);
      setCountry(chapter.address.country);
      if (chapter.website) {
        setWebsite(chapter.website);
      }
      if (chapter.facebook) {
        setFacebook(chapter.facebook);
      }
      if (chapter.instagram) {
        setInstagram(chapter.instagram);
      }
      setMaintenanceEnabled(chapter.maintenanceEnabled);
      setMaintenanceType(chapter.maintenanceType);
      setMaintenanceDuration(chapter.maintenancePeriod.duration);
      setMaintenanceUnit(chapter.maintenancePeriod.unit);
    }

    preloadFields().catch((error) => {
      // Could send notification that we are unable to load user profile?
      console.error(error);
    });
  }, []);

  const validInputs = (): boolean => {
    return (
      name !== "" &&
      chapterName !== "" &&
      street !== "" &&
      city !== "" &&
      state !== "" &&
      zip !== "" &&
      country !== ""
    );
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (validInputs()) {
      // update database:
      const user = await getUserProfile();
      const userUpdate: UserUpdate = {
        ...user,
        name: name,
        phoneNum: phoneNumber,
      };

      const chapterUpdate: ChapterUpdate = {
        name: chapterName,
        contact: contact,
        address: {
          street: street,
          city: city,
          state: state,
          zipCode: zip,
          country: country,
        },
        website: website,
        facebook: facebook,
        instagram: instagram,
        maintenanceEnabled: maintenanceEnabled,
        maintenanceType: maintenanceType,
        maintenancePeriod: {
          duration: maintenanceDuration,
          unit: maintenanceUnit,
        },
      };

      await updateUserProfile(userUpdate, chapterUpdate);

      // TODO: notification of succesful update here
    } else {
      // TODO: notification of failed update here
    }
  };

  return (
    <Flex height="100%" width="100%">
      <Flex margin="auto">
        <VStack marginY={50}>
          <Text
            alignSelf="flex-start"
            pl={4}
            fontSize="xx-large"
            fontWeight={700}
          >
            Profile
          </Text>
          <VStack
            minW={{ base: 425, md: 800 }}
            p={12}
            border="1px solid #657788"
            borderRadius={10}
            direction="column"
            backgroundColor="surface"
            spacing={10}
            align="stretch"
          >
            <Avatar alignSelf="center" width="80px" height="80px" />
            <VStack align="start" spacing={5}>
              <Text alignSelf="flex-start" fontSize="md" fontWeight={700}>
                User Information
              </Text>
              <Flex direction={{ base: "column", md: "row" }}>
                <VStack
                  direction="column"
                  spacing={5}
                  mr={{ base: 0, md: 5 }}
                  mb={{ base: 5, md: 0 }}
                >
                  <FormControl id="name" isRequired>
                    <FormLabel fontSize="sm">Name</FormLabel>
                    <Input
                      type="name"
                      fontSize="sm"
                      width={320}
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                </VStack>
                <FormControl id="phone-number">
                  <FormLabel fontSize="sm">Phone Number</FormLabel>
                  <Input
                    type="tel"
                    fontSize="sm"
                    width={320}
                    placeholder="XXX-XXX-XXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
              </Flex>
            </VStack>
            <VStack align="start" spacing={5}>
              <Text alignSelf="flex-start" fontSize="md" fontWeight={700}>
                Chapter Information
              </Text>
              <Flex direction={{ base: "column", md: "row" }}>
                <VStack
                  direction="column"
                  spacing={5}
                  mr={{ base: 0, md: 5 }}
                  mb={{ base: 5, md: 0 }}
                >
                  <FormControl id="chapter-name" isRequired>
                    <FormLabel fontSize="sm">Name</FormLabel>
                    <Input
                      type="name"
                      fontSize="sm"
                      width={320}
                      placeholder="Chapter Name"
                      value={chapterName}
                      onChange={(e) => setChapterName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="contact" isRequired>
                    <FormLabel fontSize="sm">Contact</FormLabel>
                    <Select
                      fontSize="sm"
                      width={320}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      //TODO: Add a query to get all users get all users (name and email)
                      //where chapterId is the same as the chapterId of the user currently on the profile page.
                      //So you would have an array of objects like [{ id: 1, name: User1, email: user1@gmail.com }, {id: 2, name: User2, email: user2@gmail.com}].
                    />
                  </FormControl>
                  <FormControl id="location" isRequired>
                    <FormLabel fontSize="sm">Address</FormLabel>
                    <VStack spacing={3}>
                      <Input
                        type="text"
                        fontSize="sm"
                        width={320}
                        placeholder="Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                      <Input
                        type="text"
                        fontSize="sm"
                        width={320}
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <HStack>
                        <Select
                          fontSize="sm"
                          width={190}
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </Select>
                        <Input
                          type="text"
                          fontSize="sm"
                          width={120}
                          placeholder="ZIP"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </HStack>
                      <Select
                        fontSize="sm"
                        width={320}
                        value={maintenanceUnit}
                        onChange={(e) => setMaintenanceUnit(e.target.value)}
                      >
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </Select>
                    </VStack>
                  </FormControl>
                </VStack>
                <VStack spacing={5}>
                  <FormControl id="website">
                    <FormLabel fontSize="sm">Website URL (Optional)</FormLabel>
                    <Input
                      type="url"
                      fontSize="sm"
                      width={320}
                      placeholder="www.example.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="facebook">
                    <FormLabel fontSize="sm">Facebook Username</FormLabel>
                    <Input
                      type="url"
                      fontSize="sm"
                      width={320}
                      placeholder=""
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="instagram">
                    <FormLabel fontSize="sm">Instagram Username</FormLabel>
                    <Input
                      type="url"
                      fontSize="sm"
                      width={320}
                      placeholder=""
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </FormControl>
                </VStack>
              </Flex>
            </VStack>
            <VStack align="start" spacing={5}>
              <Checkbox size="md">Enable Maintenance</Checkbox>
              <Box>
                <Text alignSelf="flex-start" fontSize="md" fontWeight={700}>
                  Maintenance
                </Text>
                <Text
                  alignSelf="flex-start"
                  fontSize="sm"
                  fontWeight={400}
                  color="secondaryText"
                >
                  Please specify the kind of maintenance your chapter is willing
                  to support and a maintenance
                </Text>
              </Box>
              <Box>
                <Text alignSelf="flex-start" fontSize="md" fontWeight={400}>
                  Maintenance Type
                </Text>
              </Box>
              <HStack align="start" spacing={6}>
                <Checkbox size="md">Bug Fixes</Checkbox>
                <Checkbox size="md">New Features</Checkbox>
              </HStack>
              <Box>
                <Text alignSelf="flex-start" fontSize="md" fontWeight={400}>
                  Maintenance Period (after project is marked Complete)
                </Text>
              </Box>
              <HStack>
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={12}
                  width={90}
                  size="md"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Select
                  fontSize="xs"
                  width={120}
                  value={maintenanceUnit}
                  onChange={(e) => setMaintenanceUnit(e.target.value)}
                >
                  {maintenanceUnits.map((maintenanceUnit) => (
                    <option key={maintenanceUnit} value={maintenanceUnit}>
                      {maintenanceUnit}
                    </option>
                  ))}
                </Select>
              </HStack>
            </VStack>
            <Button
              variant="primary"
              alignSelf="flex-end"
              size="md"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default ChapterProfilePage;
