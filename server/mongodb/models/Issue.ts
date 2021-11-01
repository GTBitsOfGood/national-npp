import mongoose, { Schema } from "mongoose";
import { Issue, IssueStatus, MaintenanceType } from "src/utils/types";

const IssueSchema = new Schema<Issue>(
  {
    project: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: MaintenanceType,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: IssueStatus,
      default: IssueStatus.PENDING,
    },
    images: [String],
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
    finishedAt: Date,
  },
  {
    timestamps: true,
  }
);

const IssueModel =
  (mongoose.models.Issue as mongoose.Model<Issue>) ||
  mongoose.model<Issue>("Issue", IssueSchema);

export default IssueModel;
