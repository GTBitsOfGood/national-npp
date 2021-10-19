import { Text, VStack, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getNonprofitProject } from "src/actions/Project";
import { showError } from "src/utils/notifications";
import { User, Nonprofit } from "src/utils/types";

function NonprofitInfoCard(props: { projectId: string }) {
  const { projectId } = props;

  const [projectName, setProjectName] = useState("");
  const [nonprofitName, setNonprofitName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [mission, setMission] = useState("");
  const [appType, setAppType] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    async function preloadFields() {
      const project = await getNonprofitProject(projectId);
      const nonprofit = project.nonprofit as Nonprofit;
      const contact = nonprofit.contact as User;
      const address = nonprofit.address;

      setProjectName(project.name);
      setNonprofitName(nonprofit.name);
      setContactName(contact.name);
      setContactEmail(contact.email);
      setContactPhone(contact.phoneNum ?? "");
      setStreet(address.street);
      setCity(address.city);
      setState(address.state);
      setZipCode(address.zipCode);
      setMission(nonprofit.mission ?? "");
      setAppType(project.type ?? "");
      setIsVerified(nonprofit.isVerified);
    }

    preloadFields().catch((error: Error) => {
      showError(error.message);
    });
  }, []);

  return (
    <VStack
      minW={{ base: 45, md: 100 }}
      minH={{ base: 45, md: 200 }}
      p={8}
      m={12}
      border="1px solid #BCC5D1"
      borderRadius={10}
      direction="column"
      backgroundColor="surface"
      spacing={3}
      align="stretch"
    >
      <VStack align="stretch" p={10} spacing={10}>
        {isVerified && (
          <VStack align="start" spacing={5}>
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight={700}
              color="#79c099"
              bgColor="#ecf6f0"
            >
              Verified
            </Text>
          </VStack>
        )}
        <Heading alignSelf="flex-start" fontSize="3xl" fontWeight={700}>
          {projectName}
        </Heading>

        <VStack align="start" spacing={5}>
          <VStack align="start">
            <Text alignSelf="flex-start" fontSize="sm" fontWeight={500}>
              Nonprofit
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              {nonprofitName}
            </Text>
          </VStack>
          <VStack align="start">
            <Text alignSelf="flex-start" fontSize="sm" fontWeight={500}>
              Nonprofit Contact
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              {contactName}
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              {contactEmail}
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              {contactPhone}
            </Text>
          </VStack>
          <VStack align="start">
            <Text alignSelf="flex-start" fontSize="sm" fontWeight={500}>
              Address
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              {street}
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              {city} {state}, {zipCode}
            </Text>
          </VStack>
          <VStack align="start">
            <Text alignSelf="flex-start" fontSize="sm" fontWeight={500}>
              Mission
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              {mission}
            </Text>
          </VStack>
          <VStack align="start">
            <Text alignSelf="flex-start" fontSize="sm" fontWeight={500}>
              Product Type
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              {appType}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

export default NonprofitInfoCard;
