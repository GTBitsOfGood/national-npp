import {
  ChapterGetProjects,
  NonprofitGetProjects,
  SortingOption,
  ProjectStage,
} from "src/utils/types";

export function projectStageToInt(stage: ProjectStage) {
  switch (stage) {
    case ProjectStage.SUBMIT_APPLICATION:
      return 0;
    case ProjectStage.APPLICATION_REVIEW:
      return 1;
    case ProjectStage.SCHEDULE_INTERVIEW:
      return 2;
    case ProjectStage.INTERVIEW_SCHEDULED:
      return 3;
    case ProjectStage.INTERVIEW_REVIEW:
      return 4;
    case ProjectStage.SCHEDULE_MEETING:
      return 5;
    case ProjectStage.MEETING_SCHEDULED:
      return 6;
    case ProjectStage.MAINTENANCE:
      return 7;
    case ProjectStage.COMPLETED:
      return 8;
    case ProjectStage.CANCELLED:
      return 9;
    case ProjectStage.REJECTED:
      return 10;
  }
}

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

  return sorter;
}
