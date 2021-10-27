import { Text, VStack, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { User, Nonprofit, Project } from "src/utils/types";

interface Props {
  project: Project;
}

function NonprofitInfoCard({ project }: Props) {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [nonprofitName, setNonprofitName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [mission, setMission] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const nonprofit = project.nonprofit as Nonprofit;
    const contact = nonprofit.contact as User;
    const address = nonprofit.address;

    setProjectName(project.name);
    setProjectType(project.type);
    setNonprofitName(nonprofit.name);
    setContactName(contact.name);
    setContactEmail(contact.email);
    setContactPhone(contact.phoneNum ?? "");
    setStreet(address.street);
    setCity(address.city);
    setState(address.state);
    setZipCode(address.zipCode);
    setMission(nonprofit.mission ?? "");
    setIsVerified(nonprofit.isVerified);
  }, [project]);

  return (
    <VStack
      display={{ base: "none", lg: "flex" }}
      width="500px"
      padding="50px 40px"
      marginRight="40px"
      border="1px solid"
      borderColor="border"
      borderRadius="lg"
      backgroundColor="surface"
      align="stretch"
    >
      <VStack align="stretch" spacing="40px">
        <VStack spacing="15px">
          {isVerified && (
            <Text
              alignSelf="flex-start"
              fontSize="md"
              fontWeight="bold"
              padding="5px 10px"
              color="#79c099"
              bgColor="#ecf6f0"
              borderRadius="md"
            >
              Verified
            </Text>
          )}
          <Heading alignSelf="flex-start" fontSize="3xl">
            {projectName}
          </Heading>
        </VStack>
        <VStack align="stretch" spacing="20px">
          <VStack align="start">
            <Text fontSize="md" fontWeight="semi-bold">
              Nonprofit
            </Text>
            <Text fontSize="lg" fontWeight="thin">
              {nonprofitName}
            </Text>
          </VStack>
          <VStack align="start">
            <Text fontSize="md" fontWeight="semi-bold">
              Nonprofit Contact
            </Text>
            <Text fontSize="lg" fontWeight="thin">
              {contactName}
            </Text>
            <Text fontSize="lg" fontWeight="thin">
              {contactEmail}
            </Text>
            <Text fontSize="lg" fontWeight="thin">
              {contactPhone}
            </Text>
          </VStack>
          <VStack align="start">
            <Text fontSize="md" fontWeight="semi-bold">
              Address
            </Text>
            <Text fontSize="lg" fontWeight="thin">
              {street}
            </Text>
            <Text fontSize="lg" fontWeight="thin">
              {city} {state}, {zipCode}
            </Text>
          </VStack>
          <VStack align="start">
            <Text fontSize="md" fontWeight="semi-bold">
              Mission
            </Text>
            <Text fontSize="lg" fontWeight="thin">
              {mission}
            </Text>
          </VStack>
          <VStack align="start">
            <Text fontSize="md" fontWeight="semi-bold">
              Product Type
            </Text>
            <Text fontSize="lg" fontWeight="thin">
              {projectType}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

export default NonprofitInfoCard;
