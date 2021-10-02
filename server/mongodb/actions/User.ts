import { Types } from "mongoose";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { UserUpdate } from "src/utils/types";

export async function getChapterUser(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId).populate("chapter");

  return user;
}

export async function getNonprofitUser(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId).populate("nonprofit");

  return user;
}

export async function getChapterUsers(chapterId: Types.ObjectId) {
  await dbConnect();

  const users = await UserModel.find({ chapter: chapterId }).populate(
    "chapter"
  );

  return users;
}

export async function updateChapterUser(
  userId: Types.ObjectId,
  userUpdate: UserUpdate
) {
  await dbConnect();

  const user = await UserModel.findByIdAndUpdate(userId, userUpdate, {
    new: true,
  }).populate("chapter");

  return user;
}

export async function updateNonprofitUser(
  userId: Types.ObjectId,
  userUpdate: UserUpdate
) {
  await dbConnect();

  const user = await UserModel.findByIdAndUpdate(userId, userUpdate, {
    new: true,
  }).populate("nonprofit");

  return user;
}
