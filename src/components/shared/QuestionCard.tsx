import {
  VStack,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { maxTextArea } from "src/utils/validation";

interface Props {
  isRead: boolean;
  number: string;
  answer: string;
  children: React.ReactChild;
  onChangeHandler: (value: string) => void;
}

function QuestionCard({
  isRead,
  number,
  answer,
  children,
  onChangeHandler,
}: Props) {
  return (
    <FormControl isReadOnly={isRead}>
      <FormLabel fontSize="sm">{number}</FormLabel>
      <VStack align="flex-start" spacing={4}>
        <FormHelperText fontSize="sm">{children}</FormHelperText>
        {isRead && (
          <Textarea
            resize="none"
            maxLength={maxTextArea}
            fontSize="sm"
            value={answer}
          />
        )}
        {!isRead && (
          <Textarea
            resize="none"
            maxLength={maxTextArea}
            placeholder="Type Answer Here..."
            fontSize="sm"
            onChange={(e) => onChangeHandler(e.target.value)}
          />
        )}
      </VStack>
    </FormControl>
  );
}

export default QuestionCard;
