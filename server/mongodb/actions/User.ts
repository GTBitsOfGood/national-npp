import { Types } from "mongoose";
import ChapterModel from "server/mongodb/models/Chapter";
import NonprofitModel from "server/mongodb/models/Nonprofit";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { ChapterUpdateUser, NonprofitUpdateUser } from "src/utils/types";

export async function chapterGetUser(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId).populate({
    path: "chapter",
    model: ChapterModel,
  });

  return user;
}

export async function nonprofitGetUser(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId).populate({
    path: "nonprofit",
    model: NonprofitModel,
  });

  return user;
}

export async function chapterGetUsers(chapterId: Types.ObjectId) {
  await dbConnect();

  const users = await UserModel.find({ chapter: chapterId });

  return users;
}

export async function nonprofitGetUsers(nonprofitId: Types.ObjectId) {
  await dbConnect();

  const users = await UserModel.find({ nonprofit: nonprofitId });

  return users;
}

export async function chapterUpdateUser(
  userId: Types.ObjectId,
  userUpdate: ChapterUpdateUser
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

export async function nonprofitUpdateUser(
  userId: Types.ObjectId,
  userUpdate: NonprofitUpdateUser
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