import { Types } from "mongoose";
import IssueModel from "server/mongodb/models/Issue";
import dbConnect from "server/utils/dbConnect";

export async function getIssuesForProject(projectId: Types.ObjectId) {
  await dbConnect();

  const issues = await IssueModel.find({ project: projectId });

  return issues;
}
