import {
  Text,
  VStack,
  Flex,
  Link,
  FormControl,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  nonprofitCreateApplication,
  chapterGetApplication,
} from "src/actions/Application";
import QuestionCard from "src/components/shared/QuestionCard";
import { showError, showInfo } from "src/utils/notifications";
import {
  NonprofitCreateApplication,
  Nonprofit,
  Project,
} from "src/utils/types";
import urls from "src/utils/urls";
import { einPattern } from "src/utils/validation";

interface Props {
  isRead: boolean;
  project: Project;
}

function ApplicationCard({ isRead, project }: Props) {
  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isSaving, setSaving] = useState(false);

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
    async function getApplication() {
      const application = await chapterGetApplication(project._id.toString());

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

    const nonprofit = project.nonprofit as Nonprofit;
    setProjectName(project.name);
    setIsVerified(nonprofit.isVerified);

    if (isRead) {
      getApplication().catch((error: Error) => {
        showError(error.message);
      });
    }
  }, [isRead, project]);

  const handleSubmit = async () => {
    if (!isVerified && !einPattern.test(ein)) {
      showError("EIN format is invalid.");
      return;
    }

    const applicationCreate: NonprofitCreateApplication = {
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

    setSaving(true);

    try {
      await nonprofitCreateApplication(
        project._id.toString(),
        applicationCreate
      );

      showInfo("Successfully submitted application.");
      await router.replace(urls.pages.nonprofit.projects.index);
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }

    setSaving(false);
  };

  return (
    <VStack
      maxW="1000px"
      border="1px solid"
      borderColor="border"
      borderRadius="lg"
      backgroundColor="surface"
      align="stretch"
    >
      <Flex
        height="50px"
        justify="start"
        align="center"
        borderTopRadius="lg"
        backgroundColor="primary"
        paddingLeft="40px"
      >
        <Text color="white" fontSize="md" fontWeight="bold">
          {projectName}
        </Text>
      </Flex>
      <VStack align="stretch" p="40px" spacing="40px">
        {!isRead && !isVerified && (
          <VStack align="start" spacing={5}>
            <Text fontSize="lg" fontWeight="bold">
              Nonprofit Verification
            </Text>
            <FormControl>
              <VStack align="flex-start" spacing={4}>
                <FormHelperText fontSize="sm" color="primaryText">
                  Please enter your EIN so we can verify your nonprofit.
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
          <Text fontSize="lg" fontWeight="bold">
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
            <Text>What services do you provide to the community?</Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 3"
            answer={aboutQ2}
            onChangeHandler={setAboutQ2}
          >
            <Text>
              Does your organization target solving any of the UN Sustainable
              Development Goals? If so, which ones? (See{" "}
              <Link color="primary" href="sdgs.un.org/goals">
                sdgs.un.org/goals
              </Link>
              )
            </Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 4"
            answer={aboutQ4}
            onChangeHandler={setAboutQ4}
          >
            <Text>
              How would the collaboration with Hack4Impact help achieve your
              mission?
            </Text>
          </QuestionCard>
        </VStack>
        <VStack align="start" spacing={5}>
          <Text fontSize="lg" fontWeight="bold">
            Your Product Needs
          </Text>
          <QuestionCard
            isRead={isRead}
            number="Question 1"
            answer={needsQ1}
            onChangeHandler={setNeedsQ1}
          >
            <Text>
              What problem are you hoping to solve with this technology?
            </Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 2"
            answer={needsQ2}
            onChangeHandler={setNeedsQ2}
          >
            <Text>What is the current stage of product development?</Text>
          </QuestionCard>
          <QuestionCard
            isRead={isRead}
            number="Question 3"
            answer={needsQ3}
            onChangeHandler={setNeedsQ3}
          >
            <Text>
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
            <Text>
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
            <Text>
              Is there anything else related to your product that you would like
              to share?
            </Text>
          </QuestionCard>
        </VStack>
        <VStack align="start" fontSize="sm" fontWeight="bold" spacing={0}>
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
            variant="primary"
            alignSelf="flex-end"
            size="md"
            fontSize="md"
            onClick={handleSubmit}
            isLoading={isSaving}
          >
            Submit Form
          </Button>
        )}
      </VStack>
    </VStack>
  );
}

export default ApplicationCard;
