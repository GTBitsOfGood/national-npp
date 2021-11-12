import { Types } from "mongoose";
import {
  nonprofitGetProject,
  nonprofitUpdateProject,
} from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import {
  NonprofitGetProject,
  NonprofitUpdateProject,
  Role,
} from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
    },
    handler: async (req) => {
      const projectId = req.query.id as string;
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit");
      }

      const projectGet = req.query.projectGet as NonprofitGetProject;
      const project = await nonprofitGetProject(
        Types.ObjectId(projectId),
        nonprofitId,
        projectGet
      );

      return project;
    },
  },
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
    },
    handler: async (req) => {
      const projectId = req.query.id as string;
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const projectUpdate = req.body.projectUpdate as NonprofitUpdateProject;

      const project = await nonprofitUpdateProject(
        Types.ObjectId(projectId),
        nonprofitId,
        projectUpdate
      );

      return project;
    },
  },
});
