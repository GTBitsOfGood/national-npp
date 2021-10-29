import { chapterGetProjects } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { ChapterGetProjects, Role } from "src/utils/types";

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

      const projectsGet = { ...req.query } as ChapterGetProjects;

      const projects = await chapterGetProjects(chapterId, projectsGet);
      return projects;
    },
  },
});
