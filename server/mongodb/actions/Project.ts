import { Types } from "mongoose";
import ProjectModel from "server/mongodb/models/Project";
import dbConnect from "server/utils/dbConnect";
import { ChapterStage, ProjectType } from "src/utils/types";

export async function createProject(
  userId: Types.ObjectId,
  chapterId: Types.ObjectId,
  type: ProjectType
) {
  await dbConnect();

  return null;
}

export async function getChapterProjects(chapterId: Types.ObjectId) {
  await dbConnect();

  return null;
}

export async function getProjectById(projectId: Types.ObjectId) {
  await dbConnect();

  return null;
}

export async function getNonprofitProject(userId: Types.ObjectId) {
  await dbConnect();

  return null;
}

export async function updateProjectStatus(
  projectId: Types.ObjectId,
  status: ChapterStage
) {
  await dbConnect();

  return null;
}

export async function updateProjectContact(
  projectId: Types.ObjectId,
  userId: Types.ObjectId
) {
  await dbConnect();

  return null;
}
