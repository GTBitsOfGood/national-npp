import { Types } from "mongoose";
import { getChapters, updateChapter } from "server/mongodb/actions/Chapter";
import APIWrapper from "server/utils/APIWrapper";
import { ChapterChange } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: false,
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "chapters") {
        const chapters = await getChapters();
        return chapters;
      }
    },
  },
  PATCH: {
    config: {
      requireSession: false,
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "update") {
        const chapterId = req.user?.chapter;
        const partialChapterUpdate = req.body as ChapterChange;
        console.log(partialChapterUpdate);

        if (!chapterId) {
          throw new Error("User is missing chapter.");
        }

        if (!partialChapterUpdate) {
          throw new Error("Missing updated chapter info.");
        }

        const update = await updateChapter(chapterId, partialChapterUpdate);
        return update;
      }
    },
  },
});
