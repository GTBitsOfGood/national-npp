import ChapterModel from "server/mongodb/models/Chapter";
import dbConnect from "server/utils/dbConnect";
import { ChapterChange } from "src/utils/types";

export async function getChapters() {
  await dbConnect();

  return null;
}

export async function updateChapter(
  chapterId: Types.ObjectId,
  chapter: ChapterChange
) {
  await dbConnect();

  return null;
}
