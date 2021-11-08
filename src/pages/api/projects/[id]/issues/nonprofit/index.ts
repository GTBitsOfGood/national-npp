import { Types } from "mongoose";
import { getIssuesForProject } from "server/mongodb/actions/Issue";
import { nonprofitGetProject } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
    },
    handler: async (req) => {
      const projectId = req.query.id as string;
      const project = await nonprofitGetProject(Types.ObjectId(projectId));
      if (!project) {
        throw new Error("Project does not exist");
      }
      if (project.nonprofit !== req.user.nonprofit) {
        throw new Error("Nonprofit cannot access project they do not own");
      }

      const issues = await getIssuesForProject(Types.ObjectId(projectId));

      return issues;
    },
  },
});
