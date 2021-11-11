import { FilterQuery, Types } from "mongoose";
import { displayableProjectStageToProjectStages } from "src/utils/stages";
import {
  Project,
  ProjectStage,
  DisplayableProjectStage,
  ChapterGetProjects,
  NonprofitGetProjects,
} from "src/utils/types";

export function chapterGetProjectsFilter(
  chapterId: Types.ObjectId,
  projectsGet: ChapterGetProjects
) {
  const filter: FilterQuery<Project> = {
    chapter: chapterId,
  };

  const filterStatus = projectsGet.filterStatus;
  if (filterStatus != undefined) {
    if (filterStatus === ProjectStage.APPLICATION_REVIEW) {
      filter["status"] = ProjectStage.APPLICATION_REVIEW;
    }
  }

  const filterDisplayableStatus = projectsGet.filterDisplayableStatus;
  if (filterDisplayableStatus != undefined) {
    if (filterDisplayableStatus === DisplayableProjectStage.APPLICATION) {
      filter["status"] = {
        $in: displayableProjectStageToProjectStages(
          DisplayableProjectStage.APPLICATION
        ),
      };
    } else if (filterDisplayableStatus === DisplayableProjectStage.COMPLETE) {
      filter["status"] = {
        $in: displayableProjectStageToProjectStages(
          DisplayableProjectStage.COMPLETE
        ),
      };
    } else if (filterDisplayableStatus === DisplayableProjectStage.INTERVIEW) {
      filter["status"] = {
        $in: displayableProjectStageToProjectStages(
          DisplayableProjectStage.INTERVIEW
        ),
      };
    } else if (
      filterDisplayableStatus === DisplayableProjectStage.IN_PROGRESS
    ) {
      filter["status"] = {
        $in: displayableProjectStageToProjectStages(
          DisplayableProjectStage.IN_PROGRESS
        ),
      };
    }
  }

  return filter;
}

export function nonprofitGetProjectsFilter(
  nonprofitId: Types.ObjectId,
  projectsGet: NonprofitGetProjects
) {
  const filter: FilterQuery<Project> = {
    nonprofit: nonprofitId,
  };

  const active = projectsGet.active;

  // will filter by active or inactive only if filter specified
  if (active != undefined) {
    filter["status"] = active
      ? {
          $nin: displayableProjectStageToProjectStages(
            DisplayableProjectStage.COMPLETE
          ),
        }
      : {
          $in: displayableProjectStageToProjectStages(
            DisplayableProjectStage.COMPLETE
          ),
        };
  }

  const filterStatus = projectsGet.filterStatus;
  if (filterStatus != undefined) {
    if (filterStatus === DisplayableProjectStage.APPLICATION) {
      filter["status"] = {
        $in: displayableProjectStageToProjectStages(
          DisplayableProjectStage.APPLICATION
        ),
      };
    } else if (filterStatus === DisplayableProjectStage.COMPLETE) {
      filter["status"] = {
        $in: displayableProjectStageToProjectStages(
          DisplayableProjectStage.COMPLETE
        ),
      };
    } else if (filterStatus === DisplayableProjectStage.INTERVIEW) {
      filter["status"] = {
        $in: displayableProjectStageToProjectStages(
          DisplayableProjectStage.INTERVIEW
        ),
      };
    } else if (filterStatus === DisplayableProjectStage.IN_PROGRESS) {
      filter["status"] = {
        $in: displayableProjectStageToProjectStages(
          DisplayableProjectStage.IN_PROGRESS
        ),
      };
    }
  }

  return filter;
}
