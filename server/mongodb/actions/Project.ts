import { FilterQuery, Types } from "mongoose";
import ChapterModel from "server/mongodb/models/Chapter";
import NonprofitModel from "server/mongodb/models/Nonprofit";
import ProjectModel from "server/mongodb/models/Project";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { displayableProjectStageToProjectStages } from "src/utils/stages";
import {
  ChapterUpdateProject,
  DisplayableProjectStage,
  NonprofitUpdateProject,
  Project,
  NonprofitCreateProject,
  ProjectStage,
  ChapterGetProjects,
  NonprofitGetProjects,
  ChapterGetProject,
  NonprofitGetProject,
} from "src/utils/types";

export async function nonprofitCreateProject(
  nonprofitId: Types.ObjectId,
  projectCreate: NonprofitCreateProject
) {
  await dbConnect();

  const project = await ProjectModel.create({
    ...projectCreate,
    nonprofit: nonprofitId,
  });

  return project;
}

export async function chapterGetProjects(
  chapterId: Types.ObjectId,
  projectsGet: ChapterGetProjects
) {
  await dbConnect();

  const status = projectsGet.status;

  if (status === ProjectStage.APPLICATION_REVIEW) {
    const projects = await ProjectModel.find({ status }).populate({
      path: "nonprofit",
      model: NonprofitModel,
      populate: {
        path: "contact",
        model: UserModel,
      },
    });

    return projects;
  }

  const projects = await ProjectModel.find({
    chapter: chapterId,
  });

  return projects;
}

export async function chapterGetProject(
  projectId: Types.ObjectId,
  chapterId: Types.ObjectId,
  projectGet: ChapterGetProject
) {
  await dbConnect();

  const status = projectGet.status;

  if (status === ProjectStage.APPLICATION_REVIEW) {
    const project = await ProjectModel.findOne({
      _id: projectId,
      status,
    }).populate({
      path: "nonprofit",
      model: NonprofitModel,
      populate: {
        path: "contact",
        model: UserModel,
      },
    });

    return project;
  }

  const project = await ProjectModel.findOne({
    _id: projectId,
    chapter: chapterId,
  });

  return project;
}

export async function nonprofitGetProject(
  projectId: Types.ObjectId,
  nonprofitId: Types.ObjectId,
  projectGet: NonprofitGetProject
) {
  await dbConnect();

  const project = await ProjectModel.findOne({
    _id: projectId,
    nonprofit: nonprofitId,
    ...projectGet,
  }).populate({ path: "nonprofit", model: NonprofitModel });

  return project;
}

export async function nonprofitGetProjects(
  nonprofitId: Types.ObjectId,
  projectsGet: NonprofitGetProjects
) {
  await dbConnect();

  const filter: FilterQuery<Project> = {
    nonprofit: nonprofitId,
  };

  const active = projectsGet.active;

  // will filter by active or inactive only if filter specified
  if (active != undefined) {
    filter["status"] = active
      ? {
          $nin: displayableProjectStageToProjectStages(
            DisplayableProjectStage.COMPLETE
          ),
        }
      : {
          $in: displayableProjectStageToProjectStages(
            DisplayableProjectStage.COMPLETE
          ),
        };
  }

  const projects = await ProjectModel.find(filter).populate({
    path: "chapter",
    model: ChapterModel,
    populate: {
      path: "contact",
      model: UserModel,
    },
  });

  return projects;
}

export async function nonprofitUpdateProject(
  projectId: Types.ObjectId,
  nonprofitId: Types.ObjectId,
  projectUpdate: NonprofitUpdateProject
) {
  await dbConnect();

  const project = await ProjectModel.findOneAndUpdate(
    { _id: projectId, nonprofit: nonprofitId },
    projectUpdate,
    { new: true }
  );

  return project;
}

export async function chapterUpdateProject(
  projectId: Types.ObjectId,
  chapterId: Types.ObjectId,
  projectUpdate: ChapterUpdateProject
) {
  await dbConnect();

  const status = projectUpdate.status;

  if (status === ProjectStage.SCHEDULE_INTERVIEW) {
    const project = await ProjectModel.findOneAndUpdate(
      { _id: projectId, status: ProjectStage.APPLICATION_REVIEW },
      projectUpdate,
      {
        new: true,
      }
    );

    return project;
  }

  const project = await ProjectModel.findOneAndUpdate(
    { _id: projectId, chapter: chapterId },
    projectUpdate,
    { new: true }
  );

  return project;
}
