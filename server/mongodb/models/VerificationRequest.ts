import mongoose, { Schema } from "mongoose";
import { VerificationRequest } from "src/utils/types";

const VerificationRequestSchema = new Schema<VerificationRequest>(
  {
    identifier: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
  },
  { timestamps: true }
);

const VerificationRequestModel =
  (mongoose.models
    .VerificationRequest as mongoose.Model<VerificationRequest>) ||
  mongoose.model<VerificationRequest>(
    "VerificationRequest",
    VerificationRequestSchema
  );

export default VerificationRequestModel;
