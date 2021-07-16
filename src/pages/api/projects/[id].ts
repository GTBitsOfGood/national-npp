import { Types } from "mongoose";
import { getProjectById } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: false,
      roles: [Role.CHAPTER_MEMBER],
    },
    handler: async (req) => {
      const id = req.query.id as string;

      if (!id) {
        throw new Error("User is missing project id");
      }

      const project = await getProjectById(Types.ObjectId(id));
      return project;
    },
  },
});
