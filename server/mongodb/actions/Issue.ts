import { Types } from "mongoose";
import IssueModel from "server/mongodb/models/Issue";
import dbConnect from "server/utils/dbConnect";
import { NonprofitUpdateIssue } from "src/utils/types";

export async function nonprofitGetIssue(
  issueId: Types.ObjectId,
  projectId: Types.ObjectId
) {
  await dbConnect();

  const issue = await IssueModel.findOne({ _id: issueId, project: projectId });

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
