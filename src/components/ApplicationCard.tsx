import {
  Text,
  VStack,
  Box,
  HStack,
  Link,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import QuestionCard from "src/components/QuestionCard";
import { User, ProjectType, Nonprofit } from "src/utils/types";

function ApplicationCard(props: { isRead: boolean }) {
  const name = "Liv2BGirl";
  const appType = "Mobile App";
  const maxTextArea = 500;
  const isVerified = false;
  const { isRead } = props;
  //const [name, setName] = useState("");

  const answers = {
    questionA1: "12-1234567",
    questionB1: "answer B1",
    questionB2: "answer B2",
    questionB3: "answer B3",
    questionB4: "answer B4",
    questionC1: "answer C1",
    questionC2: "answer C2",
    questionC3: "answer C3",
    questionC4: "answer C4",
    questionC5: "answer C5",
  };

  return (
    <VStack
      minW={{ base: 425, md: 800 }}
      //p={12}
      m={12}
      border="1px solid #BCC5D1"
      borderRadius={10}
      direction="column"
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
        <HStack spacing={3}>
          <Text color="white" fontSize="md" fontWeight={700} marginLeft={7}>
            {name}
          </Text>
          <Text color="white" fontSize="md" fontWeight={700} marginLeft={7}>
            {appType}
          </Text>
        </HStack>
      </Box>
      <VStack align="stretch" p={12} spacing={12}>
        {!isVerified && (
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
                {isRead && (
                  <Input
                    pattern="^[0-9]{2}-[0-9]{7}$"
                    id="EIN"
                    placeholder="00-0000000"
                    value={answers.questionA1}
                  />
                )}
                {!isRead && (
                  <Input
                    pattern="^[0-9]{2}-[0-9]{7}$"
                    id="EIN"
                    placeholder="00-0000000"
                  />
                )}
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
            question="Who do you care to serve?"
            answer={answers.questionB1}
          />
          <QuestionCard
            isRead={isRead}
            number="Question 2"
            question="What services do you provide to the community?"
            answer={answers.questionB2}
          />
          <FormControl isReadOnly={isRead}>
            <FormLabel fontSize="sm">Question 3</FormLabel>
            <VStack align="flex-start" spacing={4}>
              <FormHelperText fontSize="sm">
                Does your organization target solving any of the UN Sustainable
                Development Goals? If so, which ones? (See{" "}
                <Link color="primary" href="sdgs.un.org/goals">
                  sdgs.un.org/goals
                </Link>{" "}
                for more information on the goals).
              </FormHelperText>
              {isRead && (
                <Textarea
                  resize="none"
                  maxLength={maxTextArea}
                  placeholder="Type Answer Here"
                  fontSize="sm"
                >
                  {answers.questionB3}
                </Textarea>
              )}
              {!isRead && (
                <Textarea
                  resize="none"
                  maxLength={maxTextArea}
                  placeholder="Type Answer Here"
                  fontSize="sm"
                />
              )}
            </VStack>
          </FormControl>
          <QuestionCard
            isRead={isRead}
            number="Question 4"
            question="How would the collaboration with Hack4Impact help achieve your
                mission?"
            answer={answers.questionB4}
          />
        </VStack>
        <VStack align="start" spacing={5}>
          <Text alignSelf="flex-start" fontSize="md" fontWeight={700}>
            Your Product Needs
          </Text>
          <QuestionCard
            isRead={isRead}
            number="Question 1"
            question="What problem are you hoping to solve with this technology?"
            answer={answers.questionC1}
          />
          <QuestionCard
            isRead={isRead}
            number="Question 2"
            question="What is the current stage of product development?"
            answer={answers.questionC2}
          />
          <QuestionCard
            isRead={isRead}
            number="Question 3"
            question="What is your availability to work with us in the upcoming semester? The time you devote to us may directly influence the success of the project."
            answer={answers.questionC3}
          />
          <QuestionCard
            isRead={isRead}
            number="Question 4"
            question="Can you provide a field tour for us to get to know more about your organization and users? (i.e. observe or interview the users?)"
            answer={answers.questionC4}
          />
          <QuestionCard
            isRead={isRead}
            number="Question 5"
            question="Is there anything else related to your product that you would like to share?"
            answer={answers.questionC5}
          />
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
          >
            Submit Form
          </Button>
        )}
      </VStack>
    </VStack>
  );
}

export default ApplicationCard;
