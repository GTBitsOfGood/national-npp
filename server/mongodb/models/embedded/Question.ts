import { Schema } from "mongoose";
import { Question, QuestionType } from "src/utils/types";

const QuestionSchema = new Schema<Question>({
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(QuestionType),
    required: true,
  },
  answer: String,
});

export default QuestionSchema;
