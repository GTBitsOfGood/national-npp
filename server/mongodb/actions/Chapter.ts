import { Types } from "mongoose";
import ChapterModel from "server/mongodb/models/Chapter";
import dbConnect from "server/utils/dbConnect";
import { ChapterChange } from "src/utils/types";

export async function getChapters() {
  await dbConnect();

  const chapters = await ChapterModel.find();

  return chapters;
}

export async function updateChapter(
  chapterId: Types.ObjectId,
  chapter: ChapterChange
) {
  await dbConnect();

  const updatedChapter = await ChapterModel.updateOne(
    { _id: chapterId },
    chapter,
    { new: true }
  );

  return updatedChapter;
}
