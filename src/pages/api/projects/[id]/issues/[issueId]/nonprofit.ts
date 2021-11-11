import { Types } from "mongoose";
import { nonprofitGetIssue, nonprofitUpdateIssue } from "server/mongodb/actions/Issue";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitUpdateIssue, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER, Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const projectId = req.query.id as string;
      const issueId = req.query.issueId as string;

      const issue = await nonprofitGetIssue(
        Types.ObjectId(issueId),
        Types.ObjectId(projectId)
      );

      return issue;
    },
  },

  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER, Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const projectId = req.query.id as string;
      const issueId = req.query.issueId as string;
      const issueUpdate = req.body.issueUpdate as NonprofitUpdateIssue;
      const issue = await nonprofitUpdateIssue(
        Types.ObjectId(issueId),
        Types.ObjectId(projectId),
        issueUpdate
      );

      return issue;
    },
  }
});
