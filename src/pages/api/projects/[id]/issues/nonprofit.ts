import { Types } from "mongoose";
import { nonprofitGetIssues } from "server/mongodb/actions/Issue";
import { nonprofitGetProject } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { tryToParseBoolean } from "server/utils/request-validation";
import { NonprofitGetIssues, Role } from "src/utils/types";

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
        throw new Error("User does not belong to a nonprofit.");
      }

      const issuesGet = {
        open: tryToParseBoolean(req.query.open),
      } as NonprofitGetIssues;

      const project = await nonprofitGetProject(
        Types.ObjectId(projectId),
        nonprofitId,
        {}
      );

      if (!project) {
        throw new Error("Nonprofit does not have access to this project");
      }

      const issues = await nonprofitGetIssues(
        Types.ObjectId(projectId),
        issuesGet
      );

      return issues;
    },
  },
});
