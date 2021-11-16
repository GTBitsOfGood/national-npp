import { Types } from "mongoose";
import IssueModel from "server/mongodb/models/Issue";
import ProjectModel from "server/mongodb/models/Project";
import dbConnect from "server/utils/dbConnect";
import { projectGetIssuesFilter } from "src/utils/filter/Issue";
import { projectGetIssuesSorter } from "src/utils/sorting/Issue";
import { ProjectGetIssues } from "src/utils/types";

export async function projectGetIssues(
  projectId: Types.ObjectId,
  issuesGet: ProjectGetIssues
) {
  await dbConnect();

  const filter = projectGetIssuesFilter(projectId, issuesGet);

  const sorter = projectGetIssuesSorter(issuesGet);

  const issues = await IssueModel.find(filter).sort(sorter);

  return issues;
}
