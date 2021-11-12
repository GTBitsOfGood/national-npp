import { Button, Flex, Heading, Text, Box, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import loginImage from "public/images/login/login_first.svg";
import urls from "src/utils/urls";

function VerifyEmailPage() {
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
                <Heading fontSize="2xl">Check your email</Heading>
                <Text>A sign-in link has been sent to your email address.</Text>
                <Link href={urls.pages.login} passHref>
                  <Button width="fit-content" variant="secondary" padding="0px">
                    Retry email
                  </Button>
                </Link>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default VerifyEmailPage;
