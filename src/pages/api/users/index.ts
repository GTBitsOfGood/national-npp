import { Types } from "mongoose";
import { updateChapter } from "server/mongodb/actions/Chapter";
import { updateNonprofit } from "server/mongodb/actions/Nonprofit";
import {
  getChapterUser,
  getNonprofitUser,
  updateChapterUser,
  updateNonprofitUser,
  getChapterUsers,
  getNonprofitUsers,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { ChapterUpdate, NonprofitUpdate, UserUpdate } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const user = req.user;
      const action = req.query.action;

      if (action == "profile") {
        const userId = user.id;
        const chapterId = user.chapter;
        const nonprofitId = user.nonprofit;

        if (nonprofitId) {
          const user = await getNonprofitUser(userId);
          return user;
        }

        if (chapterId) {
          const user = await getChapterUser(userId);
          return user;
        }

        throw new Error("User does not belong to a chapter or nonprofit.");
      } else if (action == "users") {
        const chapterId = user.chapter;
        const nonprofitId = user.nonprofit;

        if (nonprofitId) {
          const users = await getNonprofitUsers(nonprofitId);

          return users;
        }

        if (chapterId) {
          const users = await getChapterUsers(chapterId);

          return users;
        }

        throw new Error("User does not belong to a chapter or nonprofit.");
      } else {
        throw new Error("Unknown action.");
      }
    },
  },
  PATCH: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const user = req.user;
      const action = req.query.action;

      if (action == "profile") {
        const userId = user.id;
        const chapterId = user.chapter;
        const nonprofitId = user.nonprofit;

        const userUpdate = req.body.userUpdate as UserUpdate;

        if (nonprofitId) {
          const nonprofitUpdate = req.body.nonprofitUpdate as NonprofitUpdate;
          if (nonprofitUpdate.contact) {
            nonprofitUpdate.contact = Types.ObjectId(
              nonprofitUpdate.contact.toString()
            );
          }

          await updateNonprofit(nonprofitId, nonprofitUpdate);

          const user = await updateNonprofitUser(userId, userUpdate);
          return user;
        }

        if (chapterId) {
          const chapterUpdate = req.body.chapterUpdate as ChapterUpdate;
          if (chapterUpdate.contact) {
            chapterUpdate.contact = Types.ObjectId(
              chapterUpdate.contact.toString()
            );
          }

          await updateChapter(chapterId, chapterUpdate);

          const user = await updateChapterUser(userId, userUpdate);
          return user;
        }

        throw new Error("User does not belong to a chapter or nonprofit.");
      } else {
        throw new Error("Unknown action.");
      }
    },
  },
});
