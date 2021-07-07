import mongoose, { Schema } from "mongoose";
import { Project, ChapterStage, ProjectType } from "src/utils/types";

const ProjectSchema = new Schema<Project>(
  {
    chapterId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ChapterStage),
      default: ChapterStage.NEW_PROJECT,
    },
    type: {
      type: String,
      enum: Object.values(ProjectType),
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
