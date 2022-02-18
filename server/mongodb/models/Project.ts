import mongoose, { CallbackError, Schema, Types } from "mongoose";
import ApplicationModel from "server/mongodb/models/Application";
import IssueModel from "server/mongodb/models/Issue";
import { deleteDocumentAndDependencies } from "server/utils/delete-document";
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

ProjectSchema.pre(
  "remove",
  async function (next: (err?: CallbackError) => void) {
    const id = this._id as Types.ObjectId;
    await Promise.all([
      // delete the issues associated with the project
      deleteDocumentAndDependencies(IssueModel, {
        project: id,
      }),
      // delete the applications associated with the project
      deleteDocumentAndDependencies(ApplicationModel, {
        project: id,
      }),
    ]);
    next();
  }
);

const ProjectModel =
  (mongoose.models.Project as mongoose.Model<Project>) ||
  mongoose.model<Project>("Project", ProjectSchema);

export default ProjectModel;
