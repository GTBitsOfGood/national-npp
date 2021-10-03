import {
  Flex,
  Stack,
  VStack,
  Heading,
  HStack,
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
  Spinner,
  TabPanels,
} from "@chakra-ui/react";
import { Step, Steps } from "chakra-ui-steps";
import Image from "next/image";
import ApplicationReviewImage from "public/images/nonprofit/project/application_review.svg";
import CancelledImage from "public/images/nonprofit/project/cancelled.svg";
import CompletedImage from "public/images/nonprofit/project/completed.svg";
import InterviewReviewImage from "public/images/nonprofit/project/interview_review.svg";
import MeetingScheduledImage from "public/images/nonprofit/project/meeting_scheduled.svg";
import RejectedImage from "public/images/nonprofit/project/rejected.svg";
import ScheduleMeetingImage from "public/images/nonprofit/project/schedule_meeting.svg";
import SubmitApplicationImage from "public/images/nonprofit/project/submit_application.svg";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import {
  getNonprofitProjects,
  updateNonprofitProject,
} from "src/actions/Project";
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
} from "src/utils/types";

function NonprofitProjectPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [currProject, setCurrProject] = useState<Partial<Project>>({});
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await getNonprofitProjects(active);
      if (projects.length !== 0 && active) {
        setCurrProject(projects[0]);
}
      setDisplayedProjects(projects);
      setTimeout(() => setLoading(false), 500);
    }
    void fetchProjects();
  }, [active]);

  const cancelProject = () => {
    // fill in after backend to update nonprofit project by id is complete
    return;
  };

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

  return (
    <Flex
      h={{ base: "fit-content", md: "100%" }}
      justifyContent="center"
      alignItems="center"
      overflowY="auto"
      w="100%"
      bgColor={{ base: "surface", md: "inherit" }}
      direction={{ base: "column", md: "row" }}
    >
      {/* modal */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
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
                <Button variant="danger" mr={3} onClick={cancelProject}>
              Cancel Project
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
          {/* project selection */}
          <Stack
            w={{ base: "full", md: "33%" }}
            spacing={{ base: "5px", md: "40px" }}
            h={{ md: "80%" }}
            py="10"
            px="5"
          >
        <Flex justifyContent="space-between" alignItems="center">
              <Heading size="lg">My Projects</Heading>
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
            <Flex display={{ base: "flex", md: "none" }} direction="column">
              <HStack>
                <Button variant="link" onClick={() => setActive(true)}>
                  Active
                </Button>
                <Button variant="link" onClick={() => setActive(false)}>
                  Closed
                </Button>
              </HStack>
              {renderNonProfitProjectCards(true)}
            </Flex>
        <Tabs
              display={{ base: "none", md: "flex" }}
          flexDirection="column"
          variant="unstyled"
              onChange={(index) => setActive(!index)}
        >
              <TabList borderBottom="1px solid #BCC5D1">
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
                {renderNonProfitProjectCards(false)}
          </TabPanels>
        </Tabs>
      </Stack>
          {/* step card */}
      <VStack
        w={{ base: "full", md: "60%" }}
        h="80%"
        alignSelf="center"
            px="5"
      >
            {currProject && Object.keys(currProject).length !== 0 ? (
              <>
        <Steps
                  activeStep={Object.values(DisplayableProjectStage).findIndex(
                    (stage) =>
                      stage ===
                      chapterStageToDisplayableProjectStage(
                        (currProject as Project).status
                      )
                  )}
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
                  p={{ md: "5" }}
          rounded="lg"
                  border={{ base: "none", md: "1px" }}
          borderColor="border"
          bgColor="surface"
          direction={{ base: "column", md: "row" }}
          h="full"
          w="full"
        >
          <Flex direction="column" flexGrow={1}>
                    <VStack
                      alignItems="flex-start"
                      maxW="100%"
                      m={{ md: 10 }}
                      spacing={5}
                    >
                      <Heading>{currProject.name}</Heading>
                      <Flex
                        direction={{ base: "row", md: "column" }}
                        flexWrap={"wrap"}
                        w="full"
                        align="flex-start"
                      >
                        <Box w={{ base: "50%", md: "full" }} my={{ md: 3 }}>
                          <Text fontWeight="bold">Chapter Partner</Text>
                          <Text>
                            {(currProject.chapter as Chapter).name}
                          </Text>{" "}
                        </Box>
                        <Box w={{ base: "50%", md: "full" }} my={{ md: 3 }}>
                          <Text fontWeight="bold"> Chapter Contact</Text>
                          <Text>{(currProject.chapter as Chapter).email}</Text>
                <Text>
                            fb @{(currProject.chapter as Chapter).facebook}
                </Text>
                <Text>
                            ig @{(currProject.chapter as Chapter).instagram}
                </Text>
                        </Box>
                        <Box w={{ base: "50%", md: "full" }} my={{ md: 3 }}>
                          <Text fontWeight="bold"> Product Type</Text>
                          <Text>{currProject.type}</Text>
                        </Box>
                      </Flex>
              <VStack align="flex-start" spacing={0}>
                <Button
                  variant="secondary"
                          color="#657788"
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
                    <StepCard
                      {...getStepCardData((currProject as Project).status)}
                    />
          </Flex>
                </Stack>{" "}
              </>
            ) : (
              <Stack
                p={{ md: "5" }}
                rounded="lg"
                border={{ base: "none", md: "1px" }}
                borderColor="border"
                bgColor="surface"
                direction={{ base: "column", md: "row" }}
                h="full"
                w="full"
                alignItems="center"
                justifyContent="center"
              >
                <VStack spacing={5}>
                  <Image src={SubmitApplicationImage} />
                  <Text>Get started on a new project with Hack4Impact!</Text>
                  <Link href={"/nonprofit/project/create"}>
                    <Button color="#0069CA" variant="solid">
                      Start a Project
                    </Button>
                  </Link>
                </VStack>
        </Stack>
            )}
          </VStack>{" "}
        </>
      )}
    </Flex>
  );
}

export default NonprofitProjectPage;
