import { Types } from "mongoose";
import ApplicationModel from "server/mongodb/models/Application";
import dbConnect from "server/utils/dbConnect";
import { NonprofitApplicationCreate } from "src/utils/types";

export async function createNonprofitApplication(
  projectId: Types.ObjectId,
  applicationCreate: NonprofitApplicationCreate
) {
  await dbConnect();

  const application = await ApplicationModel.create({
    project: projectId,
    ...applicationCreate,
  });

  return application;
}

export async function getApplication(projectId: Types.ObjectId) {
  await dbConnect();

  const application = await ApplicationModel.findOne({ project: projectId });

  return application;
}
