import { Types } from "mongoose";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { UserChange } from "src/utils/types";

export async function getChapterUserProfile(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId).populate("chapter");

  return user;
}

export async function getNonprofitUserProfile(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId).populate("nonprofit");

  return user;
}

export async function updateUserProfile(
  userId: Types.ObjectId,
  user: UserChange
) {
  await dbConnect();

  const userUpdate = await UserModel.findByIdAndUpdate(userId, user, {
    new: true,
  });

  return userUpdate;
}
