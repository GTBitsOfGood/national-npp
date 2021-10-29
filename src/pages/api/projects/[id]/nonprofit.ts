import { Types } from "mongoose";
import { nonprofitUpdateProject } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitUpdateProject, Role } from "src/utils/types";

export default APIWrapper({
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
