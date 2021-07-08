import { Types } from "mongoose";
import ProjectModel from "server/mongodb/models/Project";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { ChapterStage, ProjectType } from "src/utils/types";

export async function createProject(
  userId: Types.ObjectId,
  chapterId: Types.ObjectId,
  type: ProjectType
) {
  await dbConnect();

  const newProject = await ProjectModel.create({
    userId,
    chapterId,
    type,
  });

  return newProject;
}

export async function getChapterProjects(chapterId: Types.ObjectId) {
  await dbConnect();

  const chapterProjects = await ProjectModel.find({ chapterId });

  return chapterProjects;
}

export async function getProjectsByStatus(status: ChapterStage) {
  await dbConnect();

  const statusProjects = await ProjectModel.find({ status });

  return statusProjects;
}

export async function getProjectById(projectId: Types.ObjectId) {
  await dbConnect();

  const project = await ProjectModel.findById(projectId);

  return project;
}

export async function getNonprofitProject(userId: Types.ObjectId) {
  await dbConnect();

  const project = await ProjectModel.findOne({ userId, 'status': {$ne : ChapterStage.CLOSED}});

  return project;
}

export async function updateProjectStatus(
  projectId: Types.ObjectId,
  status: ChapterStage
) {
  await dbConnect();

  const updatedProject = await ProjectModel.updateOne({ _id: projectId }, { status });

  return updatedProject;
}

export async function updateProjectContact(
  projectId: Types.ObjectId,
  userId: Types.ObjectId
) {
  await dbConnect();

  const updatedProject = await ProjectModel.updateOne({ _id: projectId }, { contact: userId });

  return updatedProject;
}
