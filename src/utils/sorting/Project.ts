import {
  ChapterGetProjects,
  NonprofitGetProjects,
  SortingOption,
} from "src/utils/types";

export function chapterGetProjectsSorter(projectsGet: ChapterGetProjects) {
  const sorter: { [key: string]: string } = {};

  const createdAt = projectsGet.sortCreatedAt;
  if (createdAt != undefined) {
    if (createdAt == SortingOption.ASCENDING) {
      sorter["createdAt"] = SortingOption.ASCENDING;
    } else if (createdAt == SortingOption.DESCENDING) {
      sorter["createdAt"] = SortingOption.DESCENDING;
    }
  }

  const updatedAt = projectsGet.sortUpdatedAt;
  if (updatedAt != undefined) {
    if (updatedAt == SortingOption.ASCENDING) {
      sorter["updatedAt"] = SortingOption.ASCENDING;
    } else if (updatedAt == SortingOption.DESCENDING) {
      sorter["updatedAt"] = SortingOption.DESCENDING;
    }
  }

  const sortStatus = projectsGet.sortStatus;
  if (sortStatus != undefined) {
    if (sortStatus == SortingOption.ASCENDING) {
      sorter["status"] = SortingOption.ASCENDING;
    } else if (sortStatus == SortingOption.DESCENDING) {
      sorter["status"] = SortingOption.DESCENDING;
    }
  }

  return sorter;
}

export function nonprofitGetProjectsSorter(projectsGet: NonprofitGetProjects) {
  const sorter: { [key: string]: string } = {};

  const createdAt = projectsGet.sortCreatedAt;
  if (createdAt != undefined) {
    if (createdAt == SortingOption.ASCENDING) {
      sorter["createdAt"] = SortingOption.ASCENDING;
    } else if (createdAt == SortingOption.DESCENDING) {
      sorter["createdAt"] = SortingOption.DESCENDING;
    }
  }

  const updatedAt = projectsGet.sortUpdatedAt;
  if (updatedAt != undefined) {
    if (updatedAt == SortingOption.ASCENDING) {
      sorter["updatedAt"] = SortingOption.ASCENDING;
    } else if (updatedAt == SortingOption.DESCENDING) {
      sorter["updatedAt"] = SortingOption.DESCENDING;
    }
  }

  const sortStatus = projectsGet.sortStatus;
  if (sortStatus != undefined) {
    if (sortStatus == SortingOption.ASCENDING) {
      sorter["status"] = SortingOption.ASCENDING;
    } else if (sortStatus == SortingOption.DESCENDING) {
      sorter["status"] = SortingOption.DESCENDING;
    }
  }

  return sorter;
}
