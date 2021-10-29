import { Types } from "mongoose";
import { chapterGetApplication } from "server/mongodb/actions/Application";
import APIWrapper from "server/utils/APIWrapper";
import { Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_ADMIN],
    },
    handler: async (req) => {
      const projectId = req.query.id as string;

      const application = await chapterGetApplication(
        Types.ObjectId(projectId)
      );

      return application;
    },
  },
});
