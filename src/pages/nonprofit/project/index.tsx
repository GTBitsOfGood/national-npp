import {
  Flex,
  Stack,
  VStack,
  Heading,
  Box,
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
import { useMemo } from "react";
import { FaEnvelope, FaTimes } from "react-icons/fa";
import StepCard from "src/components/nonprofit/project/StepCard";
import { getNonprofitStage, nonprofitStageOrder } from "src/utils/stages";
import {
  Chapter,
  ChapterStage,
  NonprofitStage,
  Project,
  ProjectType,
} from "src/utils/types";

// TODO: Remove this when actual project is passed to page
const tempProject: Project = {
  _id: Types.ObjectId("123456789012"),
  name: "Liv2BGirl",
  type: ProjectType.MOBILE_APP,
  status: ChapterStage.SCHEDULE_INTERVIEW,
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
    projectProcess: Object.values(NonprofitStage),
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

  const chapterStage = tempProject.status;
  const nonprofitStage = getNonprofitStage(chapterStage);
  const { activeStep } = useSteps({
    initialStep: nonprofitStageOrder[nonprofitStage],
  });

  const chapterPartner = tempProject.chapter as Chapter;

  const getStepCardData = (chapterStage: ChapterStage) => {
    switch (chapterStage) {
      case ChapterStage.SUBMIT_APPLICATION:
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
      case ChapterStage.APPLICATION_REVIEW:
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
      case ChapterStage.SCHEDULE_INTERVIEW:
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
      case ChapterStage.INTERVIEW_SCHEDULED:
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
      case ChapterStage.INTERVIEW_REVIEW:
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
      case ChapterStage.SCHEDULE_MEETING:
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
      case ChapterStage.MEETING_SCHEDULED:
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
      case ChapterStage.MAINTENANCE:
      case ChapterStage.COMPLETED:
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
      case ChapterStage.REJECTED:
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
      case ChapterStage.CANCELLED:
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
    <Flex h="100%" justify="center" align="center" overflowY="auto">
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
      <VStack
        h="100%"
        w={{ base: "100%", md: "80%", lg: "65%" }}
        pb={{ base: "0", md: "40px" }}
      >
        <Steps
          activeStep={activeStep}
          colorScheme="blue"
          responsive={false}
          display={{ base: "none", md: "flex" }}
          p={10}
        >
          {Object.values(NonprofitStage).map((step) => (
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
          w="full"
        >
          <Flex direction="column" width={{ base: "100%", md: "50%" }}>
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
