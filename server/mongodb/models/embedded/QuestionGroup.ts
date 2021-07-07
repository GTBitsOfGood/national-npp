import { Schema } from "mongoose";
import QuestionSchema from "server/mongodb/models/embedded/Question";
import { QuestionGroup } from "src/utils/types";

const QuestionGroupSchema = new Schema<QuestionGroup>({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  questions: {
    type: [QuestionSchema],
    required: true,
  },
});

export default QuestionGroupSchema;
