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
import { signIn, SignInResponse, useSession } from "next-auth/client";
import Image from "next/image";
import { useRouter } from "next/router";
import loginImage from "public/images/login/login_first.svg";
import { useEffect, useState } from "react";
import { showError } from "src/utils/notifications";
import urls from "src/utils/urls";

function LoginPage() {
  const [session, sessionLoading] = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;

    if (session && session.user) {
      const user = session.user;

      if (user.nonprofit) {
        router
          .replace(urls.pages.nonprofit.projects.index)
          .catch((e: Error) => showError(e.message));
      } else if (user.chapter) {
        router
          .replace(urls.pages.chapter.projects.index)
          .catch((e: Error) => showError(e.message));
      }
    }
  }, [session, sessionLoading, router]);

  const handleSubmit = async () => {
    if (email.length === 0) {
      showError("Please enter an email.");
      return;
    }

    setLoading(true);

    const response: SignInResponse | undefined = await signIn("email", {
      email,
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

    setLoading(false);
  };

  return (
    <Flex height="100%" width="100%">
      <Flex margin="auto" paddingY="40px">
        <Flex
          flex="1"
          rounded="lg"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width={{ base: "100%", md: "70%" }}
        >
          <Stack direction={{ base: "column", md: "row" }} spacing="0px">
            <Flex
              flex="1"
              display={{ base: "none", md: "flex" }}
              bgColor="#e6f0fa"
              width="100%"
              roundedLeft="lg"
            >
              <Box position="relative" left="10%" marginY="auto">
                <Image src={loginImage} height={550} />
              </Box>
            </Flex>
            <Flex
              padding="40px"
              flex="1"
              align="center"
              justify="center"
              backgroundColor="surface"
              roundedRight="lg"
              roundedLeft={{ base: "lg", md: "none" }}
            >
              <Stack spacing="15px" width="100%" maxW="md" padding="40px">
                <Heading fontSize="2xl">Welcome!</Heading>
                <Text>
                  Login or sign up here to work on your project with Hack4Impact
                  today.
                </Text>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="john.smith@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Button
                  onClick={handleSubmit}
                  backgroundColor="primary"
                  color="white"
                  variant="solid"
                  isLoading={isLoading}
                  _hover={{ backgroundColor: "primary" }}
                  _active={{ backgroundColor: "primary" }}
                >
                  Next
                </Button>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
