import { Flex, Text, Box, Stack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

function VerifyEmailPage() {
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
            <Stack spacing={2} w={"100%"} maxW={"md"} p={16}>
              <Text
                fontFamily="Helvetica, sans-serif"
                fontSize={"28"}
                fontWeight="700"
              >
                Check your email
              </Text>
              <Text
                fontFamily="Helvetica, sans-serif"
                fontSize="17"
                fontWeight="400"
              >
                A sign in link has been sent to your email address.
              </Text>
              <NextLink href="/login">
                <Link
                  fontFamily="Helvetica, sans-serif"
                  color={"#0069CA"}
                  fontWeight={"600"}
                  fontSize="16"
                  py={2}
                >
                  Resend Email
                </Link>
              </NextLink>
            </Stack>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
}

export default VerifyEmailPage;
