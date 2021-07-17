import { Types } from "mongoose";
import {
  createProject,
  getChapterProjects,
  getNonprofitProject,
} from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { ProjectChange, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "chapter") {
        const chapterId = req.user?.chapter;

        if (!chapterId) {
          throw new Error("User is missing chapter.");
        }

        const projects = await getChapterProjects(chapterId);
        return projects;
      } else if (action == "nonprofit") {
        const nonprofitId = req.user?.nonprofit;

        if (!nonprofitId) {
          throw new Error("User is missing nonprofit.");
        }

        const project = await getNonprofitProject(nonprofitId);
        return project;
      }
    },
  },
  POST: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "create") {
        const projectInfo = req.body as ProjectChange;

        if (!projectInfo) {
          throw new Error("Not enough data provided to create a chapter");
        }

        const project = await createProject(projectInfo);
        return project;
      }
    },
  },
});
