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
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";
import { useState } from "react";
import { getUserProfile } from "src/actions/User";
import { states, countries } from "src/utils/constants";
import { Chapter, NonprofitStage, ProjectType, User } from "src/utils/types";

const requiredStages = [NonprofitStage.IN_PROGRESS, NonprofitStage.COMPLETE];

function ChapterProfilePage({ userProfile }: { userProfile: User }) {
  const [name, setName] = useState(userProfile.name);
  const [calendly, setCalendly] = useState(userProfile.calendly);
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNum);

  const chapterInfo = userProfile.chapter as Chapter;

  const [chapterName, setChapterName] = useState(chapterInfo.name || "");
  const [street, setStreet] = useState(chapterInfo.address.street || "");
  const [city, setCity] = useState(chapterInfo.address.city || "");
  const [state, setState] = useState(chapterInfo.address.state || "");
  const [zip, setZip] = useState(chapterInfo.address.zipCode || "");
  const [country, setCountry] = useState(chapterInfo.address.country || "");
  const [chapterEmail, setChapterEmail] = useState(chapterInfo.email || "");
  const [projectLimit, setProjectLimit] = useState(
    chapterInfo.projectLimit || 1
  );
  const [website, setWebsite] = useState(chapterInfo.website || "");
  const [facebook, setFacebook] = useState(chapterInfo.facebook || "");
  const [instagram, setInstagram] = useState(chapterInfo.instagram || "");
  const [chapterProjects, setChapterProjects] = useState<ProjectType[]>(
    chapterInfo.projectTypes || []
  );

  const [projectProcess, setProjectProcess] = useState<NonprofitStage[]>([
    ...chapterInfo.projectProcess,
    ...requiredStages,
  ]);

  return (
    <Flex justifyContent="center" backgroundColor="#EBEEF1" overflow="auto">
      <VStack marginY={50}>
        <Text
          alignSelf="flex-start"
          pl={4}
          fontSize="xx-large"
          fontWeight={700}
          color="black.400"
        >
          Profile
        </Text>
        <VStack
          minW={{ base: 425, md: 800 }}
          p={12}
          border="1px solid #657788"
          borderRadius={10}
          direction="column"
          backgroundColor="white"
          spacing={10}
          align="stretch"
        >
          <Avatar alignSelf="center" width="80px" height="80px" />
          <VStack align="start" spacing={5}>
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight={700}
              color="black.400"
            >
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
                <FormControl id="calendly" isRequired>
                  <FormLabel fontSize="sm">Calendly</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={320}
                    placeholder="calendly.com/"
                    value={calendly}
                    onChange={(e) => setCalendly(e.target.value)}
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
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight={700}
              color="black.400"
            >
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
                <FormControl id="chapter-email" isRequired>
                  <FormLabel fontSize="sm">Email</FormLabel>
                  <Input
                    type="email"
                    fontSize="sm"
                    width={320}
                    placeholder="chapter@email.com"
                    value={chapterEmail}
                    onChange={(e) => setChapterEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="location" isRequired>
                  <FormLabel fontSize="sm">Location</FormLabel>
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
                <FormControl id="website">
                  <FormLabel fontSize="sm">Website</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={320}
                    placeholder="chapter.org"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </FormControl>
                <FormControl id="facebook">
                  <FormLabel fontSize="sm">Facebook</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={320}
                    placeholder="facebook.com/"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </FormControl>
                <FormControl id="instagram">
                  <FormLabel fontSize="sm">Instagram</FormLabel>
                  <Input
                    type="url"
                    fontSize="sm"
                    width={320}
                    placeholder="instagram.com/"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </FormControl>
                <FormControl id="limit" isRequired>
                  <FormLabel fontSize="sm">Project Limit</FormLabel>
                  <Input
                    type="number"
                    fontSize="sm"
                    width={320}
                    placeholder="Enter a number"
                    value={projectLimit}
                    onChange={(e) => setProjectLimit(e.target.value)}
                  />
                </FormControl>
                <FormControl id="products" isRequired>
                  <FormLabel fontSize="sm">Chapter Products</FormLabel>
                  <CheckboxGroup value={chapterProjects}>
                    <HStack spacing={4}>
                      {Object.values(ProjectType).map((type) => (
                        <Checkbox
                          key={type}
                          size="sm"
                          value={type}
                          onChange={(e) => {
                            const isChecked = e.target.checked;

                            let newProjects = [...chapterProjects];
                            if (isChecked) {
                              newProjects.push(type);
                            } else {
                              newProjects = newProjects.filter(
                                (t) => t !== type
                              );
                            }

                            setChapterProjects(newProjects);
                          }}
                        >
                          {type}
                        </Checkbox>
                      ))}
                    </HStack>
                  </CheckboxGroup>
                </FormControl>
              </VStack>
            </Flex>
          </VStack>
          <VStack align="start" spacing={5}>
            <Box>
              <Text
                alignSelf="flex-start"
                fontSize="md"
                fontWeight={700}
                color="black.400"
              >
                Project Process Customization
              </Text>
              <Text
                alignSelf="flex-start"
                fontSize="sm"
                fontWeight={400}
                color="grey"
              >
                Customize your project process for nonprofits to follow.
              </Text>
            </Box>
            <CheckboxGroup value={projectProcess}>
              <VStack align="start" spacing={2}>
                {Object.values(NonprofitStage).map((stage) => {
                  const isRequired = requiredStages.includes(stage);

                  return (
                    <Checkbox
                      key={stage}
                      isDisabled={isRequired}
                      size="md"
                      value={stage}
                      onChange={(e) => {
                        const isChecked = e.target.checked;

                        let newProcess = [...projectProcess];
                        if (isChecked) {
                          newProcess.push(stage);
                        } else {
                          newProcess = newProcess.filter((s) => s !== stage);
                        }

                        setProjectProcess(newProcess);
                      }}
                    >
                      {isRequired ? `${stage} (Required)` : stage}
                    </Checkbox>
                  );
                })}
              </VStack>
            </CheckboxGroup>
          </VStack>
          <Button alignSelf="flex-end" size="md" colorScheme="blue">
            Save Changes
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const userProfile = await getUserProfile();
  // TODO needs chapter role

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

export default ChapterProfilePage;
