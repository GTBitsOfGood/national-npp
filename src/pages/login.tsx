/*import { Flex } from "@chakra-ui/react";

function LoginPage() {
  return (
    <Flex>
      Page where nonprofit or chapter can input their email to receive a link to
      log in
    </Flex>
  );
}

export default LoginPage;
*/
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Link,
  Box,
  Stack,
  Image,
  useColorModeValue,
  Checkbox
} from '@chakra-ui/react';

export default function SplitScreen() {
  return (
    <Flex align={"center"} justify={"center"} bg={"#EBEEF1"} height={"100%"}>
      <Box
        position={"absolute"}
        rounded={"lg"}
        border="1px"
        borderColor="#657788"
        borderRadius="10px"
        minW={"100vh"}
      >
        <Stack
          minH={"50vh"}
          direction={{ base: "column", md: "row" }}
          spacing={0}
        >
          <Flex flex={1}>
            <Box bg={"#0069CA"} width={"100%"} opacity=".1" />
          </Flex>
          <Flex
            p={8}
            flex={1}
            align={"center"}
            justify={"center"}
            bg={"#FFFFFF"}
            rounded={"lg"}
          >
            <Stack spacing={4} w={"100%"} maxW={"md"} p={14}>
              <Heading fontSize={"2xl"}>Welcome!</Heading>
              <Text>
                Login or sign up here to work on your project with Hack4Impact
                today.
              </Text>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="name@email.com" />
              </FormControl>
              <Stack spacing={8} py={4}>
                <Button bg={"#0069CA"} variant={"solid"} textColor={"white"} fontSize={18} p={7}>
                  Next
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
}
/*
    */