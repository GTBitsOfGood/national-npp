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
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
// import { states, countries } from "src/utils/constants";

function NonprofitProfilePage() {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  const [nameOrg, setNameOrg] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const [mission, setMission] = useState<string>("");

  return (
    <Flex justifyContent="center" backgroundColor="#EBEEF1" overflow="auto">
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
          minW={425}
          minH={1150}
          border="1px solid #657788"
          borderRadius={10}
          backgroundColor="white"
          justifyContent="center"
        >
          <VStack margin={50} w={325}>
            <Avatar width="80px" height="80px" marginBottom={50} />
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight={700}
              color={"black.400"}
            >
              {"User Information"}
            </Text>
            <Flex flexDirection={"column"} w={325} h={220}>
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
                    value={name}
                    onChangeText={setName}
                    marginBottom={6}
                  />
                </FormControl>
                <FormControl id="phone">
                  <FormLabel fontSize="sm">Phone Number (Optional)</FormLabel>
                  <Input
                    type="phone"
                    fontSize="sm"
                    width={320}
                    placeholder="(XXX) XXX-XXXX"
                    value={number}
                    onChangeText={setNumber}
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
              {"Nonprofit Information"}
            </Text>
            <Flex flexDirection={"column"} w={325} h={600}>
              <Flex flexDirection="column" justifyContent="space-between">
                <FormControl id="name">
                  <FormLabel fontSize="sm">Organization Name</FormLabel>
                  <Input
                    type="name"
                    fontSize="sm"
                    width={320}
                    placeholder="Organization Name"
                    value={nameOrg}
                    onChangeText={setNameOrg}
                    marginBottom={5}
                  />
                </FormControl>
                <FormControl id="url">
                  <FormLabel fontSize="sm">Website URL (Optional)</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={320}
                    placeholder="nonprofit.org"
                    value={website}
                    onChangeText={setWebsite}
                    marginBottom={5}
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
                    marginBottom={5}
                  >
                    {/* {countryOptions} */}
                  </Select>
                </FormControl>
                <FormControl id="mission">
                  <FormLabel fontSize="sm">
                    Organization Mission (Optional)
                  </FormLabel>
                  <Textarea
                    value={mission}
                    // onChangeText={setMission}
                    placeholder="Organization Mission"
                    size="sm"
                  />
                </FormControl>
              </Flex>
            </Flex>
            <Spacer />
            <Flex flexDirection="row" alignSelf={"flex-end"}>
              <Button marginTop={5} size="md" colorScheme="blue">
                Save Changes
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default NonprofitProfilePage;
