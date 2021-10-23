import { Types } from "mongoose";
import ChapterModel from "server/mongodb/models/Chapter";
import NonprofitModel from "server/mongodb/models/Nonprofit";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { UserUpdate } from "src/utils/types";

export async function getChapterUser(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId).populate({
    path: "chapter",
    model: ChapterModel,
  });

  return user;
}

export async function getNonprofitUser(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId).populate({
    path: "nonprofit",
    model: NonprofitModel,
  });

  return user;
}

export async function getChapterUsers(chapterId: Types.ObjectId) {
  await dbConnect();

  const users = await UserModel.find({ chapter: chapterId });

  return users;
}

export async function getNonprofitUsers(nonprofitId: Types.ObjectId) {
  await dbConnect();

  const users = await UserModel.find({ nonprofit: nonprofitId });

  return users;
}

export async function updateChapterUser(
  userId: Types.ObjectId,
  userUpdate: UserUpdate
) {
  await dbConnect();

  const user = await UserModel.findByIdAndUpdate(userId, userUpdate, {
    new: true,
  }).populate({
    path: "chapter",
    model: ChapterModel,
  });

  return user;
}

export async function updateNonprofitUser(
  userId: Types.ObjectId,
  userUpdate: UserUpdate
) {
  await dbConnect();

  const user = await UserModel.findByIdAndUpdate(userId, userUpdate, {
    new: true,
  }).populate({
    path: "nonprofit",
    model: NonprofitModel,
  });

  return user;
}
