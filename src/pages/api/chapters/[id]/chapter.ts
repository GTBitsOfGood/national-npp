import { Types } from "mongoose";
import { chapterUpdateChapter } from "server/mongodb/actions/Chapter";
import APIWrapper from "server/utils/APIWrapper";
import { ChapterUpdateChapter, Role } from "src/utils/types";

export default APIWrapper({
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_ADMIN],
    },
    handler: async (req) => {
      const chapterId = req.user.chapter;

      if (!chapterId) {
        throw new Error("User does not belong to a chapter.");
      }

      const chapterUpdate = req.body.chapterUpdate as ChapterUpdateChapter;
      if (chapterUpdate.contact) {
        chapterUpdate.contact = Types.ObjectId(
          chapterUpdate.contact.toString()
        );
      }

      const chapter = await chapterUpdateChapter(chapterId, chapterUpdate);
      return chapter;
    },
  },
});
