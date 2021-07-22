import { ChapterStage, NonprofitStage } from "src/utils/types";

export const chapterStageOrder = {
  [ChapterStage.SUBMIT_APPLICATION]: 0,
  [ChapterStage.APPLICATION_REVIEW]: 1,
  [ChapterStage.INTERVIEW_CONTACT]: 2,
  [ChapterStage.SCHEDULE_INTERVIEW]: 3,
  [ChapterStage.INTERVIEW_SCHEDULED]: 4,
  [ChapterStage.INTERVIEW_REVIEW]: 5,
  [ChapterStage.MEETING_CONTACT]: 6,
  [ChapterStage.SCHEDULE_MEETING]: 7,
  [ChapterStage.MEETING_SCHEDULED]: 8,
  [ChapterStage.COMPLETED]: 9,
  [ChapterStage.MAINTENANCE]: 10,
  [ChapterStage.CANCELLED]: 11,
  [ChapterStage.REJECTED]: 12,
  [ChapterStage.CLOSED]: 13,
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
    case ChapterStage.INTERVIEW_CONTACT:
    case ChapterStage.SCHEDULE_INTERVIEW:
    case ChapterStage.INTERVIEW_SCHEDULED:
    case ChapterStage.INTERVIEW_REVIEW:
      return NonprofitStage.INTERVIEW;
    case ChapterStage.MEETING_CONTACT:
    case ChapterStage.SCHEDULE_MEETING:
    case ChapterStage.MEETING_SCHEDULED:
      return NonprofitStage.IN_PROGRESS;
    case ChapterStage.COMPLETED:
    case ChapterStage.MAINTENANCE:
    case ChapterStage.REJECTED:
    case ChapterStage.CANCELLED:
    case ChapterStage.CLOSED:
      return NonprofitStage.COMPLETE;
    default:
      return NonprofitStage.APPLICATION;
  }
}
