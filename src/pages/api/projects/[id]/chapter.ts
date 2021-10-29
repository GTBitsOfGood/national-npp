import { Types } from "mongoose";
import {
  getChapterProject,
  updateChapterProject,
} from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { ChapterProjectUpdate, Role } from "src/utils/types";

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

      const project = await getChapterProject(
        Types.ObjectId(projectId),
        chapterId
      );

      if (!project || chapterId !== project?.chapter) {
        throw new Error("User does not belong to this project's chapter.");
      }

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

      const projectUpdate = req.body.projectUpdate as ChapterProjectUpdate;
      const project = await updateChapterProject(Types.ObjectId(projectId), {
        ...projectUpdate,
        chapter: chapterId,
      });

      if (!project || chapterId !== project?.chapter) {
        throw new Error("User does not belong to this project's chapter.");
      }

      return project;
    },
  },
});
