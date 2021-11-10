import { Types } from "mongoose";
import router from "next/router";
import { nonprofitCreateIssue } from "server/mongodb/actions/Issue";
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
      const projectId = req.query.id as string;
      const issue = await nonprofitCreateIssue(
        Types.ObjectId(projectId),
        issueCreate
      );

      return issue;
    },
  },
});
