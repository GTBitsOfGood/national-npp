import { Types } from "mongoose";
import { updateChapter } from "server/mongodb/actions/Chapter";
import { updateNonprofit } from "server/mongodb/actions/Nonprofit";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { ChapterChange, NonprofitChange, UserChange } from "src/utils/types";

export async function getChapterUserProfile(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId);

  return user;
}

export async function getNonprofitUserProfile(userId: Types.ObjectId) {
  await dbConnect();

  const user = await UserModel.findById(userId).populate('nonprofit');

  return user;
}

export async function updateChapterUserProfile(
  userId: Types.ObjectId,
  user: UserChange,
  chapter: ChapterChange
) {
  await dbConnect();

  return null;
}

export async function updateNonprofitUserProfile(
  userId: Types.ObjectId,
  user: UserChange,
  nonprofit: NonprofitChange
) {
  await dbConnect();

  return null;
}
