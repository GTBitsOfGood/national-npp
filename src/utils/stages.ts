import { ChapterStage, NonprofitStage } from "src/utils/types";

export const chapterStageOrder = {
  [ChapterStage.SUBMIT_APPLICATION]: 0,
  [ChapterStage.APPLICATION_REVIEW]: 1,
  [ChapterStage.SCHEDULE_INTERVIEW]: 2,
  [ChapterStage.INTERVIEW_SCHEDULED]: 3,
  [ChapterStage.INTERVIEW_REVIEW]: 4,
  [ChapterStage.SCHEDULE_MEETING]: 5,
  [ChapterStage.MEETING_SCHEDULED]: 6,
  [ChapterStage.MAINTENANCE]: 7,
  [ChapterStage.COMPLETED]: 8,
  [ChapterStage.CANCELLED]: 9,
  [ChapterStage.REJECTED]: 10,
};

export const nonprofitStageOrder = {
  [NonprofitStage.APPLICATION]: 0,
  [NonprofitStage.INTERVIEW]: 1,
  [NonprofitStage.IN_PROGRESS]: 2,
  [NonprofitStage.COMPLETE]: 3,
};

export function getNonprofitStage(chapterStage: ChapterStage) {
  switch (chapterStage) {
    case ChapterStage.SUBMIT_APPLICATION:
    case ChapterStage.APPLICATION_REVIEW:
      return NonprofitStage.APPLICATION;
    case ChapterStage.SCHEDULE_INTERVIEW:
    case ChapterStage.INTERVIEW_SCHEDULED:
    case ChapterStage.INTERVIEW_REVIEW:
      return NonprofitStage.INTERVIEW;
    case ChapterStage.SCHEDULE_MEETING:
    case ChapterStage.MEETING_SCHEDULED:
    case ChapterStage.MAINTENANCE:
      return NonprofitStage.IN_PROGRESS;
    case ChapterStage.COMPLETED:
    case ChapterStage.CANCELLED:
    case ChapterStage.REJECTED:
      return NonprofitStage.COMPLETE;
    default:
      return NonprofitStage.APPLICATION;
  }
}
