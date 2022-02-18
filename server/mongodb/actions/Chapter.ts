import { Types } from "mongoose";
import ChapterModel from "server/mongodb/models/Chapter";
import { ChapterRemovalModel } from "server/mongodb/models/EntityRemoval";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { deleteDocumentAndDependencies } from "server/utils/delete-document";
import { AdminDeleteChapter, ChapterUpdateChapter } from "src/utils/types";

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

export async function adminGetChapter(chapterId: Types.ObjectId) {
  await dbConnect();

  const chapter = await ChapterModel.findById(chapterId).populate({
    path: "contact",
    model: UserModel,
  });

  return chapter;
}

export async function adminDeleteChapter(deleteChapterReq: AdminDeleteChapter) {
  await dbConnect();

  if (
    (await deleteDocumentAndDependencies(ChapterModel, {
      _id: deleteChapterReq.deletedDocumentId,
    })) == 0
  ) {
    throw new Error("Chapter does not exist");
  }
  await ChapterRemovalModel.create(deleteChapterReq);
}
