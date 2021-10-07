import { Types } from "mongoose";
import { updateChapter } from "server/mongodb/actions/Chapter";
import APIWrapper from "server/utils/APIWrapper";
import { ChapterUpdate } from "src/utils/types";

export default APIWrapper({
  PATCH: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const claimedChapterId = req.query.id as string;
      const chapterId = req.user.chapter;

      if (Types.ObjectId(claimedChapterId) != chapterId) {
        throw new Error("Users cannot update chapters they do not belong to.");
      }

      const chapterUpdate = req.body.chapterUpdate as ChapterUpdate;
      if (chapterUpdate.contact) {
        chapterUpdate.contact = Types.ObjectId(
          chapterUpdate.contact.toString()
        );
      }

      const chapter = await updateChapter(chapterId, chapterUpdate);
      return chapter;
    },
  },
});
