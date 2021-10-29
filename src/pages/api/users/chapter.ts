import { getChapterUsers } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

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

      const users = await getChapterUsers(chapterId);
      return users;
    },
  },
});
