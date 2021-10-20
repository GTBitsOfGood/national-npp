import {
  Text,
  VStack,
  Box,
  Link,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  createNonprofitApplication,
  getApplication,
} from "src/actions/Application";
import { getNonprofitProject } from "src/actions/Project";
import QuestionCard from "src/components/QuestionCard";
import { showError, showInfo } from "src/utils/notifications";
import { NonprofitApplicationCreate, Nonprofit } from "src/utils/types";
import { maxTextArea } from "src/utils/validation";

function ApplicationCard(props: { isRead: boolean; projectId: string }) {
  const { isRead, projectId } = props;

  const [projectName, setProjectName] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [ein, setEin] = useState("");
  const [aboutQ1, setAboutQ1] = useState("");
  const [aboutQ2, setAboutQ2] = useState("");
  const [aboutQ3, setAboutQ3] = useState("");
  const [aboutQ4, setAboutQ4] = useState("");
  const [needsQ1, setNeedsQ1] = useState("");
  const [needsQ2, setNeedsQ2] = useState("");
  const [needsQ3, setNeedsQ3] = useState("");
  const [needsQ4, setNeedsQ4] = useState("");
  const [needsQ5, setNeedsQ5] = useState("");

  useEffect(() => {
    async function preloadFields() {
      const project = await getNonprofitProject(projectId);
      const nonprofit = project.nonprofit as Nonprofit;

      setProjectName(project.name);
      setIsVerified(nonprofit.isVerified);

      if (isRead) {
        const application = await getApplication(projectId);

        setAboutQ1(application.aboutQ1 ?? "");
        setAboutQ2(application.aboutQ2 ?? "");
        setAboutQ3(application.aboutQ3 ?? "");
        setAboutQ4(application.aboutQ4 ?? "");
        setNeedsQ1(application.needsQ1 ?? "");
        setNeedsQ2(application.needsQ2 ?? "");
        setNeedsQ3(application.needsQ3 ?? "");
        setNeedsQ4(application.needsQ4 ?? "");
        setNeedsQ5(application.needsQ5 ?? "");
      }
    }

    preloadFields().catch((error: Error) => {
      showError(error.message);
    });
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const applicationCreate: NonprofitApplicationCreate = {
      aboutQ1: aboutQ1 !== "" ? aboutQ1 : undefined,
      aboutQ2: aboutQ2 !== "" ? aboutQ2 : undefined,
      aboutQ3: aboutQ3 !== "" ? aboutQ3 : undefined,
      aboutQ4: aboutQ4 !== "" ? aboutQ4 : undefined,
      needsQ1: needsQ1 !== "" ? needsQ1 : undefined,
      needsQ2: needsQ2 !== "" ? needsQ2 : undefined,
      needsQ3: needsQ3 !== "" ? needsQ3 : undefined,
      needsQ4: needsQ4 !== "" ? needsQ4 : undefined,
      needsQ5: needsQ5 !== "" ? needsQ5 : undefined,
    };

    try {
      await createNonprofitApplication(projectId, applicationCreate);
      showInfo("Successfully submitted application.");
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }
  };

  return (
    <VStack
      maxW="1000px"
      border="1px solid #BCC5D1"
      borderRadius={10}
      backgroundColor="surface"
      spacing={3}
      align="stretch"
    >
      <Box
        borderRadius="10px 10px 0px 0px"
        border="1px solid #BCC5D1"
        backgroundColor="primary"
        p={3}
      >
        <Text color="white" fontSize="md" fontWeight={700} marginLeft={7}>
          {projectName}
        </Text>
      </Box>
      <VStack align="stretch" p={12} spacing={12}>
        {!isRead && !isVerified && (
          <VStack align="start" spacing={5}>
            <Text alignSelf="flex-start" fontSize="md" fontWeight={700}>
              Nonprofit Verification
            </Text>
            <FormControl isReadOnly={isRead}>
              <FormLabel fontSize="sm">Question 1</FormLabel>
              <VStack align="flex-start" spacing={4}>
                <FormHelperText fontSize="sm">
                  Enter your EIN so we can verify you as a nonprofit.
                </FormHelperText>
                <Input
                  id="EIN"
                  placeholder="00-0000000"
                  onChange={(e) => setEin(e.target.value)}
                />
              </VStack>
            </FormControl>
          </VStack>
        )}
        <VStack align="start" spacing={5}>
          <Text alignSelf="flex-start" fontSize="md" fontWeight={700}>
            About Your Organization
          </Text>
          <QuestionCard
            isRead={isRead}
            number="Question 1"
            answer={aboutQ1}
            onChangeHandler={setAboutQ1}
          >
            <Text>Who do you care to serve?</Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 2"
            answer={aboutQ2}
            onChangeHandler={setAboutQ2}
          >
            <Text fontsize="sm">
              {" "}
              What services do you provide to the community?
            </Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 3"
            answer={aboutQ2}
            onChangeHandler={setAboutQ2}
          >
            <Text fontsize="sm">
              {" "}
              Does your organization target solving any of the UN Sustainable
              Development Goals? If so, which ones? (See{" "}
              <Link color="primary" href="sdgs.un.org/goals">
                sdgs.un.org/goals
              </Link>{" "}
            </Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 4"
            answer={aboutQ4}
            onChangeHandler={setAboutQ4}
          >
            <Text fontsize="sm">
              How would the collaboration with Hack4Impact help achieve your
              mission?
            </Text>
          </QuestionCard>
        </VStack>
        <VStack align="start" spacing={5}>
          <Text alignSelf="flex-start" fontSize="md" fontWeight={700}>
            Your Product Needs
          </Text>
          <QuestionCard
            isRead={isRead}
            number="Question 1"
            answer={needsQ1}
            onChangeHandler={setNeedsQ1}
          >
            <Text fontSize="sm">
              {" "}
              What problem are you hoping to solve with this technology?
            </Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 2"
            answer={needsQ2}
            onChangeHandler={setNeedsQ2}
          >
            <Text fontSize="sm">
              {" "}
              What is the current stage of product development?
            </Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 3"
            answer={needsQ3}
            onChangeHandler={setNeedsQ3}
          >
            <Text fontSize="sm">
              What is your availability to work with us in the upcoming
              semester? The time you devote to us may directly influence the
              success of the project.
            </Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 4"
            answer={needsQ4}
            onChangeHandler={setNeedsQ4}
          >
            <Text fontSize="sm">
              {" "}
              Can you provide a field tour for us to get to know more about your
              organization and users? (i.e. observe or interview the users?)
            </Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 5"
            answer={needsQ5}
            onChangeHandler={setNeedsQ5}
          >
            <Text fontSize="sm">
              {" "}
              Is there anything else related to your product that you would like
              to share?
            </Text>
          </QuestionCard>
        </VStack>
        <VStack align="start" fontSize="sm" fontWeight={700} spacing={0}>
          <Text>
            Please let us know if you have any other questions or feedback.
          </Text>
          <Text>
            You can also reach out to us at{" "}
            <Link color="primary" href="mailto:contact@hack4impact.org">
              contact@hack4impact.org
            </Link>
          </Text>
        </VStack>
        {!isRead && (
          <Button
            type="submit"
            variant="primary"
            alignSelf="flex-end"
            size="md"
            fontSize="md"
            onClick={handleSubmit}
          >
            Submit Form
          </Button>
        )}
      </VStack>
    </VStack>
  );
}

export default ApplicationCard;
