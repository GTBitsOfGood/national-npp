import { FilterQuery, Types } from "mongoose";
import ChapterModel from "server/mongodb/models/Chapter";
import ProjectModel from "server/mongodb/models/Project";
import dbConnect from "server/utils/dbConnect";
import { displayableProjectStageToChapterStages } from "src/utils/stages";
import {
  ChapterProjectUpdate,
  DisplayableProjectStage,
  NonprofitProjectUpdate,
  Project,
  ProjectCreate,
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

export async function getNonprofitProjects(
  nonprofitId: Types.ObjectId,
  active?: boolean
) {
  await dbConnect();

  const filter: FilterQuery<Project> = {
    nonprofit: nonprofitId,
  };
  // will filter by active or inactive only if filter specified
  if (active != undefined) {
    filter["status"] = active
      ? {
          $nin: displayableProjectStageToChapterStages(
            DisplayableProjectStage.COMPLETE
          ),
        }
      : {
          $in: displayableProjectStageToChapterStages(
            DisplayableProjectStage.COMPLETE
          ),
        };
  }

  const projects = await ProjectModel.find(filter).populate({
    path: "chapter",
    model: ChapterModel,
  });

  return projects;
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
