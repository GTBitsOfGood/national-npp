import { Types } from "mongoose";
import ChapterModel from "server/mongodb/models/Chapter";
import dbConnect from "server/utils/dbConnect";
import { ChapterUpdateChapter } from "src/utils/types";

export async function chapterUpdateChapter(
  chapterId: Types.ObjectId,
  chapterUpdate: ChapterUpdateChapter
) {
  await dbConnect();

  const updatedChapter = await ChapterModel.findByIdAndUpdate(
    chapterId,
    chapterUpdate,
    { new: true }
  );

  return updatedChapter;
}

export async function adminGetChapters() {
  await dbConnect();

  return ChapterModel.find();
}
