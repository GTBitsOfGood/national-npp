import mongoose, { Schema } from "mongoose";
import QuestionGroupSchema from "server/mongodb/models/embedded/QuestionGroup";
import { Form, FormType } from "src/utils/types";

const FormSchema = new Schema<Form>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(FormType),
    required: true,
  },
  chapterId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  groups: {
    type: [QuestionGroupSchema],
    required: true,
  },
});

const FormModel =
  (mongoose.models.Form as mongoose.Model<Form>) ||
  mongoose.model<Form>("Form", FormSchema);

export default FormModel;
