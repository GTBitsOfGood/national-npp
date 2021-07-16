import { Flex, Stack, VStack, Heading, Box, Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import applicationSubmittedImage from "public/images/projectStatus/application_submitted.svg";
import submitApplicationImage from "public/images/projectStatus/awaiting_application.svg";
import { MouseEventHandler } from "react";
import StepCard from "src/components/nonprofit/project/StepCard";
import { ChapterStage } from "src/utils/types";

interface StepCardData {
  actionRequired: boolean;
  image: StaticImageData;
  title: string;
  text: string;
  buttonText?: string;
  buttonCallback?: MouseEventHandler;
}

const getStepCardData = (chapterStage: ChapterStage): StepCardData => {
  switch (chapterStage) {
    case ChapterStage.SUBMIT_APPLICATION:
      return {
        actionRequired: true,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
        sed do eiusmod tempor incididunt ut labore et dolore magna\
        aliqua. Adipiscing tristique risus nec feugiat in. Morbi enim\
        nunc faucibus a pellentesque sit amet porttitor. Nec ultrices\
        dui sapien eget mi proin sed libero.",
        image: submitApplicationImage,
        title: "Submit Application Form",
        buttonText: "Go to Form",
        buttonCallback: () => console.log("redirecting to form!"),
      };
    case ChapterStage.APPLICATION_SUBMITTED:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
        Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
        elementum curabitur vitae nunc.",
        image: applicationSubmittedImage,
        title: "Application Submitted",
        buttonText: undefined,
        buttonCallback: undefined,
      };
    // insert other mappings...
    default:
      return {
        actionRequired: true,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
        sed do eiusmod tempor incididunt ut labore et dolore magna\
        aliqua. Adipiscing tristique risus nec feugiat in. Morbi enim\
        nunc faucibus a pellentesque sit amet porttitor. Nec ultrices\
        dui sapien eget mi proin sed libero.",
        image: submitApplicationImage,
        title: "Submit Application Form",
        buttonText: "Go to Form",
        buttonCallback: () => console.log("redirecting to form!"),
      };
  }
};

function NonprofitProjectPage() {
  const projectName = "Liv2BGirl Mobile App";
  const chapterPartner = "University of Pennsylvania";
  const productType = "Mobile App";
  return (
    <Flex h="100%" bgColor="#EBEEF1">
      <Stack
        height={{ base: "auto", md: "70vh" }}
        width="70%"
        m="auto"
        p="10"
        rounded="lg"
        border="1px"
        borderColor="#657788"
        bgColor="#FFFF"
        direction={{ base: "column", md: "row" }}
      >
        <Flex direction="column" width={{ base: "100%", md: "50%" }}>
          <VStack
            alignItems="flex-start"
            maxW="100%"
            m={{ md: "10" }}
            height="50%"
          >
            <Heading>{projectName}</Heading>
            <Stack m="5" paddingTop="5">
              <Text>
                <Box as="span" fontWeight="bold">
                  Chapter Partner:
                </Box>{" "}
                {chapterPartner}
              </Text>
              <Text>
                <Box as="span" fontWeight="bold">
                  Product Type:
                </Box>{" "}
                {productType}
              </Text>
            </Stack>
            <Stack paddingTop="5">
              <Text fontWeight="600" fontSize="md" color="#0069CA">
                Contact Chapter
              </Text>
              <Text fontWeight="600" fontSize="md" color="#0069CA">
                Cancel Project
              </Text>
            </Stack>
          </VStack>
        </Flex>
        <Flex width={{ base: "100%", md: "50%" }}>
          <StepCard {...getStepCardData(ChapterStage.SUBMIT_APPLICATION)} />
        </Flex>
      </Stack>
    </Flex>
  );
}

export default NonprofitProjectPage;
