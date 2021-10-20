import {
  Text,
  VStack,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import { maxTextArea } from "src/utils/validation";

function QuestionCard(props: {
  isRead: boolean;
  number: string;
  answer: string;
  children: React.ReactChild;
  onChangeHandler?: (value: React.SetStateAction<string>) => void;
}) {
  const { isRead, number, answer, onChangeHandler } = props;

  return (
    <FormControl isReadOnly={isRead}>
      <FormLabel fontSize="sm">{number} </FormLabel>
      <VStack align="flex-start" spacing={4}>
        <FormHelperText fontSize="sm">{props.children}</FormHelperText>
        {isRead && (
          <Textarea
            resize="none"
            maxLength={maxTextArea}
            placeholder="Type Answer Here"
            fontSize="sm"
            value={answer}
          />
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
