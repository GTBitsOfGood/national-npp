import {
  nonprofitCreateProject,
  nonprofitGetProjects,
} from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { tryToParseBoolean } from "server/utils/request-validation";
import {
  NonprofitCreateProject,
  NonprofitGetProjects,
  ProjectStage,
  Role,
} from "src/utils/types";

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

      const projectsGet = {} as NonprofitGetProjects;

      const active = req.query.active;
      const status = req.query.status as string;

      if (active) {
        projectsGet.active = tryToParseBoolean(active);
      } else if (status) {
        projectsGet.status = status as ProjectStage;
      }

      const projects = await nonprofitGetProjects(nonprofitId, projectsGet);

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

      const projectCreate = req.body.projectCreate as NonprofitCreateProject;

      const project = await nonprofitCreateProject(nonprofitId, projectCreate);
      return project;
    },
  },
});
