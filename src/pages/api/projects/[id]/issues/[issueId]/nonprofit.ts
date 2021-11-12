import { Types } from "mongoose";
import {
  nonprofitGetIssue,
  nonprofitUpdateIssue,
} from "server/mongodb/actions/Issue";
import { nonprofitGetProject } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitUpdateIssue, ProjectStage, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER, Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const projectId = Types.ObjectId(req.query.id as string);
      const issueId = Types.ObjectId(req.query.issueId as string);
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const project = await nonprofitGetProject(
        projectId,
        nonprofitId,
        {}
      )
      if (!project){
        throw new Error("Nonprofit does not have access to this Project!")
      }
      const issue = await nonprofitGetIssue(
        issueId,
        projectId      );

      return issue;
    },
  },

  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER, Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const projectId = Types.ObjectId(req.query.id as string);
      const issueId = Types.ObjectId(req.query.issueId as string);
      const issueUpdate = req.body.issueUpdate as NonprofitUpdateIssue;
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const project = await nonprofitGetProject(
        projectId,
        nonprofitId,
        {}
      )
      if (!project){
        throw new Error("Nonprofit does not have access to this Project!")
      }
      const issue = await nonprofitUpdateIssue(
        issueId,
        projectId,
        issueUpdate
      );

      return issue;
    },
  },
});
