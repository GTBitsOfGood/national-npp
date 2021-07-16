import { Flex, Box, Stack, Text, Heading, Spacer } from "@chakra-ui/react";
import loginImage from "public/images/login_first.svg";
import StepCard from "src/components/nonprofit/project/StepCard";

function NonprofitProjectPage() {

  const projectName = "Liv2BGirl Mobile App";
  const chapterPartner = "University of Pennsylvania";
  const productType = "Mobile App";

  return (
    <Flex justify={"center"} bg={"#EBEEF1"} height={"100%"}>
      <Box
        position={"absolute"}
        rounded={"lg"}
        border="1px"
        borderColor="#657788"
        borderRadius="10px"
        width={{ base: "100%", md: "50%" }}
        minH={"55vh"}
        minW={"130vh"}
        marginTop={"15vh"}
        bg={"#FFFFFF"}
      >
        <Stack
          minH={"50vh"}
          direction={{ base: "column", md: "row" }}
          spacing={0}
          m="14"
        >
          <Flex
            flex={1}
            display={{ base: "none", md: "flex" }}
            width={"100%"}
            roundedLeft="lg"
            paddingTop="10"
          >
            <Stack justify="left">
              <Heading>{projectName}</Heading>
              <Stack paddingTop="5">
                <Flex>
                  <Text fontWeight="600" fontSize="md">
                    Chapter Partner:&nbsp;
                  </Text>
                  <Text>{chapterPartner}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="600" fontSize="md">
                    Product Type:&nbsp;
                  </Text>
                  <Text>{productType}</Text>
                </Flex>
              </Stack>
              <Stack paddingTop="5">
                <Text fontWeight="600" fontSize="md" color="#0069CA">
                  Contact Chapter
                </Text>
                <Text fontWeight="600" fontSize="md" color="#0069CA">
                  Cancel Project
                </Text>
              </Stack>
            </Stack>
          </Flex>
          <Flex>
            <StepCard
              actionRequired={false}
              image={loginImage}
              title="X"
              text="m"
            />
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
}

export default NonprofitProjectPage;
