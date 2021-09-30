import {
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { states, countries } from "src/utils/constants";

function NonprofitProfilePage() {
  const contacts = ["Joyce Shen (joyce.chen@example.com)"];
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [nonprofitName, setNonprofitName] = useState("");
  const [website, setWebsite] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(states[0]);
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState(countries[0]);
  const [contact, setContact] = useState("");
  const [mission, setMission] = useState("");

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
            border="1px solid #BCC5D1"
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
                  <FormLabel fontSize="sm">Phone Number (Optional)</FormLabel>
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
                Nonprofit Information
              </Text>
              <Flex direction={{ base: "column", md: "row" }}>
                <VStack
                  direction="column"
                  spacing={5}
                  mr={{ base: 0, md: 5 }}
                  mb={{ base: 5, md: 0 }}
                >
                  <FormControl id="nonprofit-name" isRequired>
                    <FormLabel fontSize="sm">Nonprofit Name</FormLabel>
                    <Input
                      type="name"
                      fontSize="sm"
                      width={320}
                      placeholder="Chapter Name"
                      value={nonprofitName}
                      onChange={(e) => setNonprofitName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="address" isRequired>
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
                          placeholder="Select State"
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
                        placeholder="Select Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
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
                  <FormControl id="nonprofit-contact" isRequired>
                    <FormLabel fontSize="sm">Contact</FormLabel>
                    <Select
                      fontSize="sm"
                      width={320}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    >
                      {contacts.map((contact) => (
                        <option key={contact} value={contact}>
                          {contact}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="website">
                    <FormLabel fontSize="sm">Website URL (Optional)</FormLabel>
                    <Input
                      type="url"
                      fontSize="sm"
                      width={320}
                      placeholder="facebook.com/"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </FormControl>
                </VStack>
              </Flex>
            </VStack>
            <FormControl id="mission">
              <FormLabel fontSize="sm">
                {" "}
                Organization Mission (Optional){" "}
              </FormLabel>
              <Textarea
                resize="none"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                size="sm"
              />
            </FormControl>
            <Button variant="primary" alignSelf="flex-end" size="md">
              Save Changes
            </Button>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default NonprofitProfilePage;
