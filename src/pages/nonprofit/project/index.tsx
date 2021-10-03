import {
  Flex,
  Stack,
  VStack,
  Heading,
  Box,
  Link,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  Tab,
  TabList,
  TabPanels,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Types } from "mongoose";
import ApplicationReviewImage from "public/images/nonprofit/project/application_review.svg";
import CancelledImage from "public/images/nonprofit/project/cancelled.svg";
import CompletedImage from "public/images/nonprofit/project/completed.svg";
import InterviewReviewImage from "public/images/nonprofit/project/interview_review.svg";
import MeetingScheduledImage from "public/images/nonprofit/project/meeting_scheduled.svg";
import RejectedImage from "public/images/nonprofit/project/rejected.svg";
import ScheduleMeetingImage from "public/images/nonprofit/project/schedule_meeting.svg";
import SubmitApplicationImage from "public/images/nonprofit/project/submit_application.svg";
import { useEffect, useMemo, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaEnvelope, FaTimes } from "react-icons/fa";
import StepCard from "src/components/nonprofit/project/StepCard";
import {
  chapterStageToDisplayableProjectStage,
  nonprofitStageOrder,
} from "src/utils/stages";
import {
  Chapter,
  ProjectStage,
  DisplayableProjectStage,
  Project,
  ProjectType,
} from "src/utils/types";

// TODO: Remove this when actual project is passed to page
const tempProject: Project = {
  _id: Types.ObjectId("123456789012"),
  name: "Liv2BGirl",
  type: ProjectType.MOBILE_APP,
  status: ProjectStage.SCHEDULE_INTERVIEW,
  chapter: {
    _id: Types.ObjectId("123456789012"),
    name: "Georgia Tech",
    email: "chapter@email.com",
    address: {
      city: "",
      state: "",
      street: "",
      country: "",
      zipCode: "",
    },
    projectTypes: Object.values(ProjectType),
    projectLimit: 5,
    projectProcess: Object.values(DisplayableProjectStage),
  },
  nonprofit: {
    _id: Types.ObjectId("123456789012"),
    name: "Nonprofit Org",
    isVerified: false,
    address: {
      city: "",
      state: "",
      street: "",
      country: "",
      zipCode: "",
    },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

interface Props {
  project: Project;
}

function NonprofitProjectPage({ project }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderNonProfitProjectCards = (mobile: boolean) => {
    return (
      <Box
        display="flex"
        direction={mobile ? "row" : "column"}
        overflow="scroll"
      >
        {displayedProjects.map((project: Project, index) => (
          <VStack
            key={index}
            bgColor="white"
            my="5"
            px="5"
            justifyContent="center"
            alignItems="left"
            spacing="5"
            w={mobile ? "400px" : "full"}
            height={mobile ? "100px" : "150px"}
            backgroundColor="surface"
            border="1px"
            borderColor={
              project._id === currProject._id ? "#0069CA" : "#BCC5D1"
            }
            borderRadius="15px"
            onClick={() => setCurrProject(project)}
          >
            <Heading size={mobile ? "md" : "lg"}>{project.name}</Heading>
            <Box
              color="primary"
              m="0"
              bgColor="rgba(0, 105, 202, 0.1)"
              px="2"
              w="fit-content"
            >
              <Text fontWeight="bold">{project.status}</Text>
            </Box>
          </VStack>
        ))}
      </Box>
    );
  };

  const getStepCardData = (chapterStage: ProjectStage) => {
    switch (chapterStage) {
      case ProjectStage.SUBMIT_APPLICATION:
        return {
          actionRequired: true,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
            sed do eiusmod tempor incididunt ut labore et dolore magna\
            aliqua. Adipiscing tristique risus nec feugiat in. Morbi enim\
            nunc faucibus a pellentesque sit amet porttitor. Nec ultrices\
            dui sapien eget mi proin sed libero.",
          image: SubmitApplicationImage,
          title: "Submit Application Form",
          buttons: [
            <Button
              onClick={() => console.log("redirecting to form")}
              variant="primary"
              key="first-button"
            >
              Go to Form
            </Button>,
          ],
        };
      case ProjectStage.APPLICATION_REVIEW:
        return {
          actionRequired: false,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
          image: ApplicationReviewImage,
          title: "Application Under Review",
          buttons: [],
        };
      case ProjectStage.SCHEDULE_INTERVIEW:
        return {
          actionRequired: true,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
          image: ScheduleMeetingImage,
          title: "Schedule an Interview",
          buttons: [
            <Button
              onClick={() => console.log("scheduling interview")}
              variant="primary"
              key="first-button"
            >
              Schedule Interview
            </Button>,
          ],
        };
      case ProjectStage.INTERVIEW_SCHEDULED:
        return {
          actionRequired: false,
          text: "Your interview is scheduled for July 27th from 4:30 PM - 5:30 PM EST.",
          image: MeetingScheduledImage,
          title: "Interview Scheduled",
          buttons: [
            <Button
              onClick={() => console.log("rescheduling interview")}
              variant="secondary"
              key="first-button"
            >
              Reschedule Interview
            </Button>,
            <Button
              onClick={() => console.log("cancelling interview")}
              variant="secondary"
              key="second-button"
            >
              Cancel Interview
            </Button>,
          ],
        };
      case ProjectStage.INTERVIEW_REVIEW:
        return {
          actionRequired: false,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
          image: InterviewReviewImage,
          title: "Interview Under Review",
          buttons: [],
        };
      case ProjectStage.SCHEDULE_MEETING:
        return {
          actionRequired: true,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
          image: ScheduleMeetingImage,
          title: "Schedule a Meeting",
          buttons: [
            <Button
              onClick={() => console.log("scheduling meeting")}
              variant="primary"
              key="first-button"
            >
              Schedule Meeting
            </Button>,
          ],
        };
      case ProjectStage.MEETING_SCHEDULED:
        return {
          actionRequired: false,
          text: "Discussing Product Functionalities",
          image: MeetingScheduledImage,
          title: "Meeting Scheduled",
          buttons: [
            <Button
              onClick={() => console.log("rescheduling meeting")}
              variant="secondary"
              key="first-button"
            >
              Reschedule Meeting
            </Button>,
            <Button
              onClick={() => console.log("cancelling meeting")}
              variant="secondary"
              key="second-button"
            >
              Cancel Meeting
            </Button>,
          ],
        };
      case ProjectStage.MAINTENANCE:
      case ProjectStage.COMPLETED:
        return {
          actionRequired: false,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
          image: CompletedImage,
          title: "Project Complete!",
          buttons: [
            <Button
              onClick={() => console.log("returning to home")}
              variant="primary"
              key="first-button"
            >
              Return to Home
            </Button>,
          ],
        };
      case ProjectStage.REJECTED:
        return {
          actionRequired: false,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
          image: RejectedImage,
          title: "Project Rejected",
          buttons: [
            <Button
              onClick={() => console.log("returning to home")}
              variant="primary"
              key="first-button"
            >
              Return to Home
            </Button>,
          ],
        };
      case ProjectStage.CANCELLED:
        return {
          actionRequired: false,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
            Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
            elementum curabitur vitae nunc.",
          image: CancelledImage,
          title: "Project Cancelled",
          buttons: [
            <Button
              onClick={() => console.log("returning to home")}
              variant="primary"
              key="first-button"
            >
              Return to Home
            </Button>,
          ],
        };
      default:
        return {
          actionRequired: true,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
            sed do eiusmod tempor incididunt ut labore et dolore magna\
            aliqua. Adipiscing tristique risus nec feugiat in. Morbi enim\
            nunc faucibus a pellentesque sit amet porttitor. Nec ultrices\
            dui sapien eget mi proin sed libero.",
          image: SubmitApplicationImage,
          title: "Submit Application Form",
          buttons: [
            <Button
              onClick={() => console.log("redirecting to form")}
              variant="primary"
              key="first-button"
            >
              Go to Form
            </Button>,
          ],
        };
    }
  };

  const stepCardData = useMemo(
    () => getStepCardData(chapterStage),
    [chapterStage]
  );

  return (
    <Flex
      h="100%"
      justify="center"
      overflowY="auto"
      w="100%"
      direction={{ base: "column", md: "row" }}
    >
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={{ base: "20rem", md: "35rem" }}>
          <ModalHeader fontSize="2xl">Cancel Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to cancel your project?</Text>
            <Text paddingBottom={3}>
              All of your responses will be permanently deleted.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger" mr={3}>
              Cancel Project
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack w={{ base: "full", md: "33%" }} spacing="40px" py="10">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>My Projects</Heading>
          <Link href={"/nonprofit/project/create"}>
            <Button
              leftIcon={<BsPlus />}
              variant="ghost"
              color="#0069CA"
              _hover={{ boxShadow: "none" }}
            >
              New Project
            </Button>
          </Link>
        </Flex>
        <Tabs
          flexGrow={1}
          display="flex"
          flexDirection="column"
          variant="unstyled"
        >
          <TabList flex="0 0" borderBottom="1px solid #BCC5D1">
            <Tab
              width={120}
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              border="1px solid none"
              borderBottom="none"
              fontWeight={600}
              _selected={{
                border: "1px solid #BCC5D1",
                borderBottom: "none",
                color: "primary",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              Active
            </Tab>
            <Tab
              width={120}
              height={50}
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              border="1px solid none"
              fontWeight={600}
              _selected={{
                border: "1px solid #BCC5D1",
                borderBottom: "none",
                color: "primary",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              Closed
            </Tab>
          </TabList>

          <TabPanels
            borderBottomLeftRadius={10}
            borderTopRightRadius={10}
            borderBottomRightRadius={10}
            minH="200px"
            overflowX="hidden"
            overflowY="auto"
          >
          </TabPanels>
        </Tabs>
      </Stack>

      <VStack
        w={{ base: "full", md: "60%" }}
        pb={{ base: "0", md: "40px" }}
        h="80%"
        alignSelf="center"
      >
        <Steps
          activeStep={activeStep}
          colorScheme="blue"
          responsive={false}
          display={{ base: "none", md: "flex" }}
          p={10}
        >
          {Object.values(DisplayableProjectStage).map((step) => (
            <Step key={step} label={step} />
          ))}
        </Steps>
        <Stack
          p="5"
          rounded="lg"
          border="1px"
          borderColor="border"
          bgColor="surface"
          direction={{ base: "column", md: "row" }}
          h="full"
          w="full"
        >
          <Flex direction="column" flexGrow={1}>
            <VStack alignItems="flex-start" maxW="100%" m={10} spacing={5}>
              <Heading>{tempProject.name}</Heading>
              <VStack align="flex-start" spacing={3}>
                <Text>
                  <Box as={"span"} fontWeight="bold">
                    Chapter Partner:
                  </Box>{" "}
                  {chapterPartner.name}
                </Text>
                <Text>
                  <Box as="span" fontWeight="bold">
                    Product Type:
                  </Box>{" "}
                  {tempProject.type}
                </Text>
              </VStack>
              <VStack align="flex-start" spacing={0}>
                <Button
                  leftIcon={<FaEnvelope />}
                  variant="secondary"
                  onClick={() => window.open(`mailto:${chapterPartner.email}`)}
                  p={0}
                  _hover={{ bgColor: "none" }}
                >
                  Contact Chapter
                </Button>
                <Button
                  leftIcon={<FaTimes />}
                  variant="secondary"
                  onClick={onOpen}
                  p={0}
                  _hover={{ bgColor: "none" }}
                >
                  Cancel Project
                </Button>
              </VStack>
            </VStack>
          </Flex>
          <Flex minH="600px" w={{ base: "100%", md: "50%" }}>
            <StepCard {...stepCardData} />
          </Flex>
        </Stack>
      </VStack>
    </Flex>
  );
}

export default NonprofitProjectPage;
