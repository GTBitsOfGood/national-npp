import { FilterQuery, Types } from "mongoose";
import { ProjectGetIssues, Issue, IssueStatus } from "src/utils/types";

export function projectGetIssuesFilter(
  projectId: Types.ObjectId,
  issuesGet: ProjectGetIssues
) {
  const filter: FilterQuery<Issue> = {
    project: projectId,
  };

  const filterStatus = issuesGet.filterStatus;
  if (filterStatus != undefined) {
    if (filterStatus === IssueStatus.CLOSED) {
      filter["status"] = IssueStatus.CLOSED;
    } else if (filterStatus === IssueStatus.IN_PROGRESS) {
      filter["status"] = IssueStatus.IN_PROGRESS;
    } else if (filterStatus === IssueStatus.PENDING) {
      filter["status"] = IssueStatus.PENDING;
    } else if (filterStatus === IssueStatus.RESOLVED) {
      filter["status"] = IssueStatus.RESOLVED;
    }
  }

  return filter;
}
