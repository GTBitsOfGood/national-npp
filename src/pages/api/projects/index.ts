import { Types } from "mongoose";
import {
  getChapterProjects,
  getProjectById,
} from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "chapter") {
        const chapterId = req.user?.chapter;

        if (!chapterId) {
          throw new Error("User is missing chapter.");
        }

        const projects = await getChapterProjects(chapterId);
        return projects;
      } else if (action == "id") {
        const id = req.query?.id as string;

        if (!id) {
          throw new Error("User is missing project id");
        }

        const project = await getProjectById(Types.ObjectId(id));
        return project;
      }
    },
  },
});
