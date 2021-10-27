import { Types } from "mongoose";
import { getApplication } from "server/mongodb/actions/Application";
import APIWrapper from "server/utils/APIWrapper";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const projectId = req.query.id as string;

      const application = await getApplication(Types.ObjectId(projectId));

      return application;
    },
  },
});
