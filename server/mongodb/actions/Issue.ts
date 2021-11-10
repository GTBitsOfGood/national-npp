import { Types } from "mongoose";
import IssueModel from "server/mongodb/models/Issue";
import dbConnect from "server/utils/dbConnect";
import { NonprofitCreateIssue } from "src/utils/types";

export async function nonprofitCreateIssue(
  projectId: Types.ObjectId,
  issueCreate: NonprofitCreateIssue
) {
  await dbConnect();

  const issue = await IssueModel.create({
    project: projectId,
    ...issueCreate,
  });

  return issue;
}
