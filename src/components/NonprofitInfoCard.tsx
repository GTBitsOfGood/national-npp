import {
  Text,
  VStack,
  Heading,
  Box,
  HStack,
  Link,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { User, ProjectType, Nonprofit } from "src/utils/types";
function NonprofitInfoCard() {
  const name = "Liv2BGirl";
  const appType = "Mobile App";
  const isVerified = false;

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
        {!isVerified && (
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
          Liv2BGirl Mobile App
        </Heading>

        <VStack align="start" spacing={5}>
          {/* Import info from nonprofit profile, now only hardcoded like figma */}
          <VStack align="start">
            <Text alignSelf="flex-start" fontSize="sm" fontWeight={500}>
              Nonprofit
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              {name}
            </Text>
          </VStack>
          <VStack align="start">
            <Text alignSelf="flex-start" fontSize="sm" fontWeight={500}>
              Nonprofit Contact
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              First Last
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              example@gmail.com
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              XXX-XXX-XXXX
            </Text>
          </VStack>
          <VStack align="start">
            <Text alignSelf="flex-start" fontSize="sm" fontWeight={500}>
              Address
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              000 Address Street
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              Atlanta GA, 30332
            </Text>
          </VStack>
          <VStack align="start">
            <Text alignSelf="flex-start" fontSize="sm" fontWeight={500}>
              Mission
            </Text>
            <Text alignSelf="flex-start" fontSize="lg" fontWeight={100}>
              This is a bio
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
