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

function QuestionCard(props: {
  isRead: boolean;
  number: string;
  question: string;
  answer: string;
  onChangeHandler?: (value: React.SetStateAction<string>) => void;
}) {
  const { isRead, number, question, answer, onChangeHandler } = props;
  const maxTextArea = 500;
  return (
    <FormControl isReadOnly={isRead}>
      <FormLabel fontSize="sm">{number} </FormLabel>
      <VStack align="flex-start" spacing={4}>
        <FormHelperText fontSize="sm">
          <Text>{question}</Text>
        </FormHelperText>
        {isRead && (
          <Textarea
            resize="none"
            maxLength={maxTextArea}
            placeholder="Type Answer Here"
            fontSize="sm"
          >
            {answer}
          </Textarea>
        )}
        {!isRead && (
          <Textarea
            resize="none"
            maxLength={maxTextArea}
            placeholder="Type Answer Here"
            fontSize="sm"
            onChange={(e) => onChangeHandler && onChangeHandler(e.target.value)}
          />
        )}
      </VStack>
    </FormControl>
  );
}

export default QuestionCard;
