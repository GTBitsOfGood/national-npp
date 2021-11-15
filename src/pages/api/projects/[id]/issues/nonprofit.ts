import { Types } from "mongoose";
import {
  nonprofitCreateIssue,
  nonprofitGetIssues,
} from "server/mongodb/actions/Issue";
import { nonprofitGetProject } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { tryToParseBoolean } from "server/utils/request-validation";
import {
  NonprofitCreateIssue,
  NonprofitGetIssues,
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
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
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
        throw new Error("Nonprofit does not own this project!");
      }

      const issue = await nonprofitCreateIssue(projectId, issueCreate);

      return issue;
    },
  },
});
