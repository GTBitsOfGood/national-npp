import { Types } from "mongoose";
import ProjectModel from "server/mongodb/models/Project";
import dbConnect from "server/utils/dbConnect";
import {
  ProjectCreate,
  ChapterStage,
  NonprofitProjectUpdate,
  ChapterProjectUpdate,
} from "src/utils/types";

export async function createProject(
  nonprofitId: Types.ObjectId,
  projectCreate: ProjectCreate
) {
  await dbConnect();

  const project = await ProjectModel.create({
    ...projectCreate,
    nonprofit: nonprofitId,
  });

  return project;
}

export async function getChapterProjects(chapterId: Types.ObjectId) {
  await dbConnect();

  const projects = await ProjectModel.find({ chapterId });

  return projects;
}

export async function getChapterProject(
  projectId: Types.ObjectId,
  chapterId: Types.ObjectId
) {
  await dbConnect();

  const project = await ProjectModel.findOne({
    _id: projectId,
    chapter: chapterId,
  });

  return project;
}

export async function getNonprofitProject(nonprofitId: Types.ObjectId) {
  await dbConnect();

  const project = await ProjectModel.findOne({
    nonprofit: nonprofitId,
    status: { $ne: ChapterStage.CLOSED }, // TODO: Add other inactive project stages
  });

  return project;
}

export async function updateNonprofitProject(
  nonprofitId: Types.ObjectId,
  projectUpdate: NonprofitProjectUpdate
) {
  await dbConnect();

  const project = await ProjectModel.findOneAndUpdate(
    { nonprofitId },
    projectUpdate,
    { new: true }
  );

  return project;
}

export async function updateChapterProject(
  projectId: Types.ObjectId,
  chapterId: Types.ObjectId,
  projectUpdate: ChapterProjectUpdate
) {
  await dbConnect();

  const project = await ProjectModel.findOneAndUpdate(
    { _id: projectId, chapter: chapterId },
    projectUpdate,
    { new: true }
  );

  return project;
}
