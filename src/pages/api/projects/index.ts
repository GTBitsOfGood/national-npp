import {
  createProject,
  getChapterProjects,
  getNonprofitProject,
  updateNonprofitProject,
} from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitProjectUpdate, ProjectCreate, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const user = req.user;
      const action = req.query.action;

      if (action == "chapter") {
        const chapterId = user.chapter;

        if (!chapterId) {
          throw new Error("User does not belong to a chapter.");
        }

        const projects = await getChapterProjects(chapterId);
        return projects;
      } else if (action == "nonprofit") {
        const nonprofitId = user.nonprofit;

        if (!nonprofitId) {
          throw new Error("User does not belong to a nonprofit.");
        }

        const project = await getNonprofitProject(nonprofitId);
        return project;
      } else {
        throw new Error("Unknown action.");
      }
    },
  },
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
    },
    handler: async (req) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const projectCreate = req.body.projectCreate as ProjectCreate;

      const project = await createProject(nonprofitId, projectCreate);
      return project;
    },
  },
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "nonprofit") {
        const nonprofitId = req.user.nonprofit;

        if (!nonprofitId) {
          throw new Error("User does not belong to a nonprofit.");
        }

        const projectUpdate = req.body.projectUpdate as NonprofitProjectUpdate;

        const project = await updateNonprofitProject(
          nonprofitId,
          projectUpdate
        );
        return project;
      } else {
        throw new Error("Unknown action.");
      }
    },
  },
});
