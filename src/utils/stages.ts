import { ProjectStage, DisplayableProjectStage } from "src/utils/types";

export const projectStageOrder = {
  [ProjectStage.SUBMIT_APPLICATION]: 0,
  [ProjectStage.APPLICATION_REVIEW]: 1,
  [ProjectStage.SCHEDULE_INTERVIEW]: 2,
  [ProjectStage.INTERVIEW_SCHEDULED]: 3,
  [ProjectStage.INTERVIEW_REVIEW]: 4,
  [ProjectStage.SCHEDULE_MEETING]: 5,
  [ProjectStage.MEETING_SCHEDULED]: 6,
  [ProjectStage.MAINTENANCE]: 7,
  [ProjectStage.COMPLETED]: 8,
  [ProjectStage.CANCELLED]: 9,
  [ProjectStage.REJECTED]: 10,
};

export const displayableProjectStageOrder = {
  [DisplayableProjectStage.APPLICATION]: 0,
  [DisplayableProjectStage.INTERVIEW]: 1,
  [DisplayableProjectStage.IN_PROGRESS]: 2,
  [DisplayableProjectStage.COMPLETE]: 3,
};

export const displayableProjectStageDefinitions = {
  [DisplayableProjectStage.APPLICATION]: [
    ProjectStage.SUBMIT_APPLICATION,
    ProjectStage.APPLICATION_REVIEW,
  ],
  [DisplayableProjectStage.INTERVIEW]: [
    ProjectStage.SCHEDULE_INTERVIEW,
    ProjectStage.INTERVIEW_SCHEDULED,
    ProjectStage.INTERVIEW_REVIEW,
  ],
  [DisplayableProjectStage.IN_PROGRESS]: [
    ProjectStage.SCHEDULE_MEETING,
    ProjectStage.MEETING_SCHEDULED,
    ProjectStage.MAINTENANCE,
  ],
  [DisplayableProjectStage.COMPLETE]: [
    ProjectStage.COMPLETED,
    ProjectStage.CANCELLED,
    ProjectStage.REJECTED,
  ],
};

const projectStageToDisplayableStage = Object.fromEntries(
  Object.entries(displayableProjectStageDefinitions).flatMap(
    ([displayableStage, stages]) =>
      stages.map((stage) => [
        stage,
        displayableStage as DisplayableProjectStage,
      ])
  )
);

export function projectStageToDisplayableProjectStage(
  projectStage: ProjectStage
): DisplayableProjectStage {
  return (
    projectStageToDisplayableStage[projectStage] ??
    DisplayableProjectStage.APPLICATION
  );
}

export function displayableProjectStageToProjectStages(
  displayableProjectStage: DisplayableProjectStage
): ProjectStage[] {
  return displayableProjectStageDefinitions[displayableProjectStage];
}
