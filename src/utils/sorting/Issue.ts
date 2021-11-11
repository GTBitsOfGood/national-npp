import { ProjectGetIssues, SortingOption } from "src/utils/types";

export function projectGetIssuesSorter(issuesGet: ProjectGetIssues) {
  const sorter: { [key: string]: string } = {};

  const createdAt = issuesGet.sortCreatedAt;
  if (createdAt != undefined) {
    if (createdAt == SortingOption.ASCENDING) {
      sorter["createdAt"] = SortingOption.ASCENDING;
    } else if (createdAt == SortingOption.DESCENDING) {
      sorter["createdAt"] = SortingOption.DESCENDING;
    }
  }

  const updatedAt = issuesGet.sortUpdatedAt;
  if (updatedAt != undefined) {
    if (updatedAt == SortingOption.ASCENDING) {
      sorter["updatedAt"] = SortingOption.ASCENDING;
    } else if (updatedAt == SortingOption.DESCENDING) {
      sorter["updatedAt"] = SortingOption.DESCENDING;
    }
  }

  return sorter;
}
