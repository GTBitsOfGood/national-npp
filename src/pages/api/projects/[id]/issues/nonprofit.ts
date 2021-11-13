import { Types } from "mongoose";
import { nonprofitCreateIssue } from "server/mongodb/actions/Issue";
import { nonprofitGetProject } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitCreateIssue, Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER, Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const issueCreate = req.body.issueCreate as NonprofitCreateIssue;
      const projectId = Types.ObjectId(req.query.id as string);
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User is not part of a Nonprofit!");
      }

      const project = await nonprofitGetProject(projectId, nonprofitId, {});

      if (!project) {
        throw new Error("Nonprofit does not own project!");
      }

      const issue = await nonprofitCreateIssue(projectId, issueCreate);

      return issue;
    },
  },
});
