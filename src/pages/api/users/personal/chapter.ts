import { chapterGetUser, chapterUpdateUser } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { ChapterUpdateUser, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const chapterId = req.user.chapter;

      if (!chapterId) {
        throw new Error("User does not belong to a chapter.");
      }

      const user = await chapterGetUser(req.user.id);
      return user;
    },
  },
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const chapterId = req.user.chapter;

      if (!chapterId) {
        throw new Error("User does not belong to a chapter.");
      }

      const userUpdate = req.body.userUpdate as ChapterUpdateUser;

      const user = await chapterUpdateUser(req.user.id, userUpdate);
      return user;
    },
  },
});
