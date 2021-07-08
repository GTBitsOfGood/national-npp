import { Types } from "mongoose";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";

export async function getChapterUserProfile(userId: Types.ObjectId) {
  await dbConnect();

  const model = await UserModel.findById(userId);

  return model;
}

export async function getNonprofitUserProfile(userId: Types.ObjectId) {
  await dbConnect();

  return null;
}
