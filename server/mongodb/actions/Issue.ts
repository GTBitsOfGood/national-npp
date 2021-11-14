import { FilterQuery, Types } from "mongoose";
import IssueModel from "server/mongodb/models/Issue";
import dbConnect from "server/utils/dbConnect";
import { Issue, IssueStatus, NonprofitGetIssues } from "src/utils/types";

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
