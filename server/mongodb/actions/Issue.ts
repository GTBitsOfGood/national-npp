import { Types } from "mongoose";
import IssueModel from "server/mongodb/models/Issue";
import dbConnect from "server/utils/dbConnect";

export async function nonprofitGetIssue(
  issueId: Types.ObjectId,
  projectId: Types.ObjectId
) {
  await dbConnect();

  const issue = await IssueModel.findOne({ _id: issueId, project: projectId });

  return issue;
}
