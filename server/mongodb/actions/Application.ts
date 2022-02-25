import { Types } from "mongoose";
import ApplicationModel from "server/mongodb/models/Application";
import dbConnect from "server/utils/dbConnect";
import {
  Application,
  NatlAdminChangeApplicationStage,
  NatlAdminUpdateProject,
  NonprofitCreateApplication,
} from "src/utils/types";
import { natlAdminUpdateProject } from "./Project";

export async function nonprofitCreateApplication(
  projectId: Types.ObjectId,
  applicationCreate: NonprofitCreateApplication
) {
  await dbConnect();

  const application = await ApplicationModel.create({
    project: projectId,
    ...applicationCreate,
  });

  return application;
}

export async function chapterGetApplication(projectId: Types.ObjectId) {
  await dbConnect();

  const application = await ApplicationModel.findOne({ project: projectId });

  return application;
}

export async function natlAdminChangeApplicationStage({
  applicationId,
  stage,
}: NatlAdminChangeApplicationStage) {
  await dbConnect();

  const application = (await ApplicationModel.findById(
    applicationId
  )) as Application;

  const updateProjectRequest = {
    status: stage,
  } as NatlAdminUpdateProject;

  await natlAdminUpdateProject(application.project, updateProjectRequest);

  return application;
}
