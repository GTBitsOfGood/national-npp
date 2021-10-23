import {
  createNonprofitProject,
  getNonprofitProjects,
} from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { tryToParseBoolean } from "server/utils/req-parameter-validation";
import { NonprofitProjectCreate, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
    },
    handler: async (req) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const projects = await getNonprofitProjects(
        nonprofitId,
        tryToParseBoolean(req.query.active)
      );

      return projects;
    },
  },
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const projectCreate = req.body.projectCreate as NonprofitProjectCreate;

      const project = await createNonprofitProject(nonprofitId, projectCreate);
      return project;
    },
  },
});
