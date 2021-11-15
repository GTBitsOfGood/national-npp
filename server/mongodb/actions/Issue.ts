import { FilterQuery, Types } from "mongoose";
import IssueModel from "server/mongodb/models/Issue";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import {
  NonprofitUpdateIssue,
  Issue,
  IssueStatus,
  NonprofitGetIssues,
} from "src/utils/types";

export async function nonprofitGetIssues(
  projectId: Types.ObjectId,
  issuesGet: NonprofitGetIssues
) {
  await dbConnect();

  const filter: FilterQuery<Issue> = {
    project: projectId,
  };

  const open = issuesGet.open;

  if (open != undefined) {
    filter["status"] = open
      ? {
          $in: [IssueStatus.PENDING, IssueStatus.IN_PROGRESS],
        }
      : {
          $in: [IssueStatus.RESOLVED, IssueStatus.CLOSED],
        };
  }

  const issues = await IssueModel.find(filter);

  return issues;
}

export async function nonprofitGetIssue(
  issueId: Types.ObjectId,
  projectId: Types.ObjectId
) {
  await dbConnect();

  const issue = await IssueModel.findOne({
    _id: issueId,
    project: projectId,
  }).populate({ path: "reviewer", model: UserModel });

  return issue;
}

export async function nonprofitUpdateIssue(
  issueId: Types.ObjectId,
  projectId: Types.ObjectId,
  issueUpdate: NonprofitUpdateIssue
) {
  await dbConnect();

  const issue = await IssueModel.findOneAndUpdate(
    { _id: issueId, project: projectId },
    issueUpdate,
    { new: true }
  );

  return issue;
}
