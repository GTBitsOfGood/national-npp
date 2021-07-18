import { Types } from "mongoose";
import ChapterModel from "server/mongodb/models/Chapter";
import dbConnect from "server/utils/dbConnect";
import { ChapterUpdate } from "src/utils/types";

export async function getChapters() {
  await dbConnect();

  const chapters = await ChapterModel.find();

  return chapters;
}

export async function updateChapter(
  chapterId: Types.ObjectId,
  chapter: ChapterUpdate
) {
  await dbConnect();

  const updatedChapter = await ChapterModel.findByIdAndUpdate(
    chapterId,
    chapter,
    { new: true }
  );

  return updatedChapter;
}
