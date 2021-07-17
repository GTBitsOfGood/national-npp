import { Types } from "mongoose";
import { getProjectById, updateProject } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { ProjectChange, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: false,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const projectId = req.query.projectId as string;

      if (!projectId) {
        throw new Error("Project ID is missing");
      }

      const project = await getProjectById(Types.ObjectId(id));
      return project;
    },
  },
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const projectId = req.query.projectId as string;
      const partialProjectUpdate = req.body as ProjectChange;

      if (!projectId) {
        throw new Error("Project ID is missing");
      }

      if (!partialProjectUpdate) {
        throw new Error("Missing updated project info.");
      }

      const update = await updateProject(
        Types.ObjectId(id),
        partialProjectUpdate
      );
      return update;
    },
  },
});
