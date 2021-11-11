import { Types } from "mongoose";
import ChapterModel from "server/mongodb/models/Chapter";
import NonprofitModel from "server/mongodb/models/Nonprofit";
import ProjectModel from "server/mongodb/models/Project";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import {
  chapterGetProjectsFilter,
  nonprofitGetProjectsFilter,
} from "src/utils/filter/Project";
import {
  chapterGetProjectsSorter,
  nonprofitGetProjectsSorter,
} from "src/utils/sorting/Project";
import {
  ChapterUpdateProject,
  NonprofitUpdateProject,
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

  const filter = chapterGetProjectsFilter(chapterId, projectsGet);

  const sorter = chapterGetProjectsSorter(projectsGet);

  const projects = await ProjectModel.find(filter)
    .sort(sorter)
    .populate({
      path: "nonprofit",
      model: NonprofitModel,
      populate: {
        path: "contact",
        model: UserModel,
      },
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

  const filter = nonprofitGetProjectsFilter(nonprofitId, projectsGet);

  const sorter = nonprofitGetProjectsSorter(projectsGet);

  const projects = await ProjectModel.find(filter)
    .sort(sorter)
    .populate({
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
