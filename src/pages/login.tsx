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
import loginImage from "public/images/login/login_first.svg";
import { useState } from "react";
import { showError } from "src/utils/notifications";
import urls from "src/utils/urls";

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
      await router.replace(urls.pages.verify);
    }
  };

  return (
    <Flex height="100%" width="100%">
      <Flex margin="auto" borderRadius="10px">
        <Flex
          flex="1"
          rounded={"lg"}
          border="1px"
          borderColor="border"
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
              roundedRight={"lg"}
              roundedLeft={{ base: "lg", md: "none" }}
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
                    variant="primary"
                    fontSize={18}
                    p={7}
                  >
                    Next
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
