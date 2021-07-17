import { Types } from "mongoose";
import ProjectModel from "server/mongodb/models/Project";
import dbConnect from "server/utils/dbConnect";
import { ProjectChange, ChapterStage } from "src/utils/types";

export async function createProject(project: ProjectChange) {
  await dbConnect();

  const newProject = await ProjectModel.create(project);

  return newProject;
}

export async function getChapterProjects(chapterId: Types.ObjectId) {
  await dbConnect();

  const chapterProjects = await ProjectModel.find({ chapterId });

  return chapterProjects;
}

export async function getProjectById(projectId: Types.ObjectId) {
  await dbConnect();

  const project = await ProjectModel.findById(projectId);

  return project;
}

export async function getNonprofitProject(nonprofitId: Types.ObjectId) {
  await dbConnect();

  const project = await ProjectModel.findOne({
    nonprofit: nonprofitId,
    status: { $ne: ChapterStage.CLOSED },
  });

  return project;
}

export async function updateProject(
  projectId: Types.ObjectId,
  project: ProjectChange
) {
  await dbConnect();

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    projectId,
    project,
    { new: true }
  );

  return updatedProject;
}
