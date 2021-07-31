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
  Select,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";
import { useState } from "react";
import { getUserProfile } from "src/actions/User";
import { states, countries } from "src/utils/constants";
import { Nonprofit, User } from "src/utils/types";

function NonprofitProfilePage({ userProfile }: { userProfile: User }) {
  const [name, setName] = useState(userProfile.name);
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNum);

  const nonprofitInfo = userProfile.nonprofit as Nonprofit;

  const [nonprofitName, setNonprofitName] = useState(nonprofitInfo.name || "");
  const [website, setWebsite] = useState(nonprofitInfo.website || "");
  const [street, setStreet] = useState(nonprofitInfo.address.street || "");
  const [city, setCity] = useState(nonprofitInfo.address.street || "");
  const [state, setState] = useState(nonprofitInfo.address.city);
  const [zip, setZip] = useState(nonprofitInfo.address.zipCode);
  const [country, setCountry] = useState(nonprofitInfo.address.country);
  const [mission, setMission] = useState(nonprofitInfo.mission || "");

  return (
    <Flex justifyContent="center" backgroundColor="#EBEEF1" overflow="auto">
      <VStack margin={50}>
        <Text
          alignSelf="flex-start"
          p={1}
          fontSize="xx-large"
          fontWeight={700}
          color="black.400"
        >
          Profile
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
              User Information
            </Text>
            <Flex flexDirection={"column"} w={325}>
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                marginBottom={10}
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
                    marginBottom={6}
                  />
                </FormControl>
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
            </Flex>
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight={700}
              color={"black.400"}
            >
              Nonprofit Information
            </Text>
            <Flex flexDirection={"column"} w={325} h={600}>
              <Flex flexDirection="column" justifyContent="space-between">
                <FormControl id="nonprofit-name" isRequired>
                  <FormLabel fontSize="sm">Name</FormLabel>
                  <Input
                    type="name"
                    fontSize="sm"
                    width={320}
                    placeholder="Nonprofit Name"
                    value={nonprofitName}
                    onChange={(e) => setNonprofitName(e.target.value)}
                    marginBottom={5}
                  />
                </FormControl>
                <FormControl id="website">
                  <FormLabel fontSize="sm">Website</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={320}
                    placeholder="nonprofit.org"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    marginBottom={5}
                  />
                </FormControl>
                <FormControl id="location" isRequired>
                  <FormLabel fontSize="sm">Location</FormLabel>
                  <Input
                    type="text"
                    fontSize="sm"
                    width={320}
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    marginBottom={4}
                  />
                  <Input
                    type="text"
                    fontSize="sm"
                    width={320}
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    marginBottom={4}
                  />
                  <HStack marginBottom={4}>
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
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    marginBottom={5}
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="mission">
                  <FormLabel fontSize="sm">Mission</FormLabel>
                  <Textarea
                    resize="none"
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const userProfile = await getUserProfile();
  // TODO needs nonprofit role

  if (!session) {
    return {
      redirect: {
        destination: "/src/pages/login.tsx",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        userProfile,
      },
    };
  }
};

export default NonprofitProfilePage;
