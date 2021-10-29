import { Types } from "mongoose";
import {
  chapterGetProject,
  chapterUpdateProject,
} from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { ChapterGetProject, ChapterUpdateProject, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const projectId = req.query.id as string;
      const chapterId = req.user.chapter;

      if (!chapterId) {
        throw new Error("User does not belong to a chapter.");
      }

      const projectGet = { ...req.query } as ChapterGetProject;

      const project = await chapterGetProject(
        Types.ObjectId(projectId),
        chapterId,
        projectGet
      );

      return project;
    },
  },
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const projectId = req.query.id as string;
      const chapterId = req.user.chapter;

      if (!chapterId) {
        throw new Error("User does not belong to a chapter.");
      }

      const projectUpdate = req.body.projectUpdate as ChapterUpdateProject;
      const project = await chapterUpdateProject(
        Types.ObjectId(projectId),
        chapterId,
        projectUpdate
      );

      return project;
    },
  },
});
