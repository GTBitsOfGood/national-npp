import { getChapterProjects } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";

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

      const projects = await getChapterProjects(chapterId);
      return projects;
    },
  },
});
