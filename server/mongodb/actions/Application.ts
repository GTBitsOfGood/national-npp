import { Types } from "mongoose";
import ApplicationModel from "server/mongodb/models/Application";
import dbConnect from "server/utils/dbConnect";
import { NonprofitCreateApplication } from "src/utils/types";

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
