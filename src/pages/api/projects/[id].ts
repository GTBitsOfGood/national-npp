import { Types } from "mongoose";
import {
  getChapterProject,
  updateChapterProject,
} from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { ChapterProjectUpdate } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const id = req.query.id as string;
      const action = req.query.action;

      if (action == "chapter") {
        const chapterId = req.user.chapter;

        if (!chapterId) {
          throw new Error("User does not belong to a chapter.");
        }

        const project = await getChapterProject(Types.ObjectId(id), chapterId);
        return project;
      } else {
        throw new Error("Unknown action.");
      }
    },
  },
  PATCH: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const id = req.query.id as string;
      const action = req.query.action;

      if (action == "chapter") {
        const chapterId = req.user.chapter;

        if (!chapterId) {
          throw new Error("User does not belong to a chapter.");
        }

        const projectUpdate = req.body.projectUpdate as ChapterProjectUpdate;

        const project = await updateChapterProject(
          Types.ObjectId(id),
          chapterId,
          projectUpdate
        );

        return project;
      } else {
        throw new Error("Unknown action.");
      }
    },
  },
});
