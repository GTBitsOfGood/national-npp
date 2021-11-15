import mongoose, { Schema } from "mongoose";
import { Project, ProjectStage, ProjectType } from "src/utils/types";

const ProjectSchema = new Schema<Project>(
  {
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
    nonprofit: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Nonprofit",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: Object.values(ProjectStage),
      default: ProjectStage.SUBMIT_APPLICATION,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(ProjectType),
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    maintenanceStart: {
      type: Date,
      immutable: true,
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

const ProjectModel =
  (mongoose.models.Project as mongoose.Model<Project>) ||
  mongoose.model<Project>("Project", ProjectSchema);

export default ProjectModel;
