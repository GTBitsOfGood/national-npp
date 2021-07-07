import mongoose, { Schema } from "mongoose";
import QuestionGroupSchema from "server/mongodb/models/embedded/QuestionGroup";
import { FormResponse, FormType } from "src/utils/types";

const FormResponseSchema = new Schema<FormResponse>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(FormType),
      required: true,
    },
    groups: {
      type: [QuestionGroupSchema],
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

const FormResponseModel =
  (mongoose.models.FormResponse as mongoose.Model<FormResponse>) ||
  mongoose.model<FormResponse>("FormResponse", FormResponseSchema);

export default FormResponseModel;
