import mongoose, { Schema, Types } from "mongoose";

export interface VerificationRequest {
  _id: Types.ObjectId;
  id: string;
  identifier: string;
  token: string;
  expires: Date;
}

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
