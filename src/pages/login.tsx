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
import { signIn, SignInResponse } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";
import loginImage from "public/images/login_first.svg";
import { useState } from "react";
import { showError } from "src/utils/notifications";

function LoginPage() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    const response: SignInResponse | undefined = await signIn("email", {
      email: value,
      redirect: false,
    });

    if (!response) {
      showError("No response received from sign in.");
    } else if (!response.ok) {
      response.error
        ? showError(response.error)
        : showError("Failed to sign in.");
    } else {
      await router.replace("/verify");
    }
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
                  onClick={handleSubmit}
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
