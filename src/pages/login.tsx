import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Box,
  Stack,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import Image from "next/image";
import { useState } from "react";
import loginImage from "public/images/login_first.svg";
//import NextLink from "next/link";

function LoginPage() {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <Flex align={"center"} justify={"center"} bg={"#EBEEF1"} height={"100%"}>
      <Box
        position={"absolute"}
        rounded={"lg"}
        border="1px"
        borderColor="#657788"
        borderRadius="10px"
        width={{ base: "100%", md: "70%" }}
      >
        <Stack
          minH={"50vh"}
          direction={{ base: "column", md: "row" }}
          spacing={0}
        >
          <Flex
            flex={1}
            display={{ base: "none", md: "flex" }}
            bg={"#e6f0fa"}
            width={"100%"}
            roundedLeft="lg"
          >
            <Box position="relative" left="10%" marginY="auto">
              <Image src={loginImage} height={550} />
            </Box>
          </Flex>
          <Flex
            p={8}
            flex={1}
            align={"center"}
            justify={"center"}
            bg={"#FFFFFF"}
            rounded={"lg"}
          >
            <Stack spacing={4} w={"100%"} maxW={"md"} p={{ base: 5, md: 14 }}>
              <Heading fontSize={"2xl"}>Welcome!</Heading>
              <Text>
                Login or sign up here to work on your project with Hack4Impact
                today.
              </Text>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="name@email.com"
                  value={value}
                  onChange={onChange}
                />
              </FormControl>
              <Stack spacing={8} py={4}>
                <Button
                  onClick={() => signIn("email", { email: { value } })}
                  bg={"#0069CA"}
                  variant={"solid"}
                  textColor={"white"}
                  fontSize={18}
                  _hover={{ bg: "blue.400" }}
                  p={7}
                >
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

export default LoginPage;
