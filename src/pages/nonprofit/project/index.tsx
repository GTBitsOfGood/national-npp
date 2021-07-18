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
import applicationSubmittedImage from "public/images/projectStatus/application_submitted.svg";
import assigningContact from "public/images/projectStatus/assigning_contact.svg";
import submitApplicationImage from "public/images/projectStatus/awaiting_application.svg";
import projectCancelled from "public/images/projectStatus/cancelled.svg";
import projectComplete from "public/images/projectStatus/celebration.svg";
import meeting from "public/images/projectStatus/meeting.svg";
import projectRejected from "public/images/projectStatus/rejected.svg";
import remoteMeeting from "public/images/projectStatus/remote_meeting.svg";
import underReview from "public/images/projectStatus/under_review.svg";
import { ReactNode } from "react";
import { FaEnvelope, FaTimes } from "react-icons/fa";
import ProgressBar from "src/components/nonprofit/project/ProgressBar";
import StepCard from "src/components/nonprofit/project/StepCard";
import { ChapterStage, NonprofitStage } from "src/utils/types";

interface StepCardData {
  actionRequired: boolean;
  image: StaticImageData;
  title: string;
  text: string;
  buttons: ReactNode[];
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
        buttons: [
          <Button
            onClick={() => console.log("redirecting to form")}
            colorScheme="blue"
            key="first-button"
          >
            Go to Form
          </Button>,
        ],
      };
    case ChapterStage.APPLICATION_SUBMITTED:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
        Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
        elementum curabitur vitae nunc.",
        image: applicationSubmittedImage,
        title: "Application Under Review",
        buttons: [],
      };
    case ChapterStage.ASSIGNING_CONTACT:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
        Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
        elementum curabitur vitae nunc.",
        image: assigningContact,
        title: "A contact will be reaching out to you.",
        buttons: [],
      };
    case ChapterStage.SCHEDULE_INTERVIEW:
      return {
        actionRequired: true,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
        Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
        elementum curabitur vitae nunc.",
        image: meeting,
        title: "Schedule an Interview",
        buttons: [
          <Button
            onClick={() => console.log("scheduling interview")}
            colorScheme="blue"
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
        image: meeting,
        title: "Interview Scheduled",
        buttons: [
          <Button
            onClick={() => console.log("rescheduling interview")}
            color="#0069CA"
            variant="link"
            key="first-button"
          >
            Reschedul Interview
          </Button>,
          <Button
            onClick={() => console.log("cancelling interview")}
            color="#0069CA"
            variant="link"
            key="second-button"
          >
            Cancel Interview
          </Button>,
        ],
      };
    case ChapterStage.UNDER_REVIEW:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
        Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
        elementum curabitur vitae nunc.",
        image: underReview,
        title: "Interview Under Review",
        buttons: [],
      };
    case ChapterStage.IN_PROGRESS:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
          Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
          elementum curabitur vitae nunc.",
        image: underReview,
        title: "A contact is being assigned to your project.",
        buttons: [],
      };
    case ChapterStage.MEETING_SCHEDULED:
      return {
        actionRequired: false,
        text: "Discussing Product Functionalities",
        image: remoteMeeting,
        title: "Meeting Scheduled",
        buttons: [
          <Button
            onClick={() => console.log("rescheduling meeting")}
            color="#0069CA"
            variant="link"
            key="first-button"
          >
            Reschedule Meeting
          </Button>,
          <Button
            onClick={() => console.log("cancelling meeting")}
            color="#0069CA"
            variant="link"
            key="second-button"
          >
            Cancel Meeting
          </Button>,
        ],
      };
    case ChapterStage.COMPLETED:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
        Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
        elementum curabitur vitae nunc.",
        image: projectComplete,
        title: "Project Complete!",
        buttons: [
          <Button
            onClick={() => console.log("returning to home")}
            colorScheme="blue"
            key="first-button"
          >
            Return to Home
          </Button>,
        ],
      };
    case ChapterStage.MAINTENANCE:
      return {
        actionRequired: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
        Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae \
        elementum curabitur vitae nunc.",
        image: projectComplete,
        title: "Project Complete!",
        buttons: [
          <Button
            onClick={() => console.log("launching the feedback form")}
            colorScheme="blue"
            key="first-button"
          >
            Feedback Form
          </Button>,
          <Button
            onClick={() => console.log("returning to home")}
            colorScheme="blue"
            variant="link"
            key="second-button"
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
        image: projectRejected,
        title: "Project Rejected",
        buttons: [
          <Button
            onClick={() => console.log("returning to home")}
            colorScheme="blue"
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
        image: projectCancelled,
        title: "Project Cancelled",
        buttons: [
          <Button
            onClick={() => console.log("returning to home")}
            colorScheme="blue"
            key="first-button"
          >
            Return to Home
          </Button>,
        ],
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
        buttons: [
          <Button
            onClick={() => console.log("redirecting to form")}
            colorScheme="blue"
            key="first-button"
          >
            Go to Form
          </Button>,
        ],
      };
  }
};

const getCurrNonProfitStage = (chapterStage: ChapterStage): NonprofitStage => {
  switch (chapterStage) {
    case ChapterStage.SUBMIT_APPLICATION:
    case ChapterStage.APPLICATION_SUBMITTED:
      return NonprofitStage.APPLICATION;
    case ChapterStage.ASSIGNING_CONTACT:
    case ChapterStage.SCHEDULE_INTERVIEW:
    case ChapterStage.INTERVIEW_SCHEDULED:
      return NonprofitStage.INTERVIEW;
    case ChapterStage.UNDER_REVIEW:
      return NonprofitStage.UNDER_REVIEW;
    case ChapterStage.IN_PROGRESS:
    case ChapterStage.MEETING_SCHEDULED:
      return NonprofitStage.IN_PROGRESS;
    case ChapterStage.COMPLETED:
    case ChapterStage.REJECTED:
    case ChapterStage.CANCELLED:
    case ChapterStage.MAINTENANCE:
    case ChapterStage.CLOSED:
      return NonprofitStage.COMPLETE;
    default:
      return NonprofitStage.APPLICATION;
  }
};

interface PageProps {
  projectName: string;
  chapterPartner: string;
  productType: string;
  currChapterStage: ChapterStage;
  orgEmail: string;
}

function NonprofitProjectPage({
  projectName = "Liv2BGirl Mobile App",
  chapterPartner = "University of Pennsylvania",
  productType = "Mobile App",
  currChapterStage = ChapterStage.COMPLETED,
  orgEmail = "testing@xyz.com",
}: PageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100%" bgColor="#EBEEF1">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="48rem">
          <ModalHeader>Cancel Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to cancel your project?</Text>
            <Text paddingBottom={3}>
              All of your responses will be permanently deleted.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Cancel Project
            </Button>
            <Button variant="ghost" colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack mx="auto" minW="80%">
        <ProgressBar
          currStep={Object.values(NonprofitStage).indexOf(
            getCurrNonProfitStage(currChapterStage)
          )}
          steps={Object.values(NonprofitStage).map((stage) => ({
            label: stage,
          }))}
          display={{ base: "none", md: "block" }}
          marginX="auto"
          paddingY={10}
        />
        <Stack
          height={{ base: "auto", md: "70vh" }}
          width="70%"
          m="auto"
          p="5"
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
                  <Box as={"span"} fontWeight="bold">
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
              <VStack mx="auto">
                <Button
                  leftIcon={<FaEnvelope />}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => window.open(`mailto:${orgEmail}`)}
                >
                  Contact Chapter
                </Button>
                <Button
                  leftIcon={<FaTimes />}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={onOpen}
                >
                  Cancel Project
                </Button>
              </VStack>
            </VStack>
          </Flex>
          <Flex width={{ base: "100%", md: "50%" }}>
            <StepCard {...getStepCardData(currChapterStage)} />
          </Flex>
        </Stack>
      </VStack>
    </Flex>
  );
}

export default NonprofitProjectPage;
