import { getChapterUser, updateChapterUser } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { UserUpdate } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const chapterId = req.user.chapter;

      if (!chapterId) {
        throw new Error("User does not belong to a chapter.");
      }

      const user = await getChapterUser(req.user.id);
      return user;
    },
  },
  PATCH: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const chapterId = req.user.chapter;

      if (!chapterId) {
        throw new Error("User does not belong to a chapter.");
      }

      const userUpdate = req.body.userUpdate as UserUpdate;

      const user = await updateChapterUser(req.user.id, userUpdate);
      return user;
    },
  },
});
