import { Types } from "mongoose";
import {
  createNonprofitApplication,
  getApplication,
} from "server/mongodb/actions/Applications";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitApplicationCreate } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const applicationCreate = req.body
        .applicationCreate as NonprofitApplicationCreate;
      const projectId = req.body.projectId as string;

      const application = await createNonprofitApplication(
        Types.ObjectId(projectId),
        applicationCreate
      );

      return application;
    },
  },
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const projectId = req.query.projectId as string;

      const application = await getApplication(Types.ObjectId(projectId));

      return application;
    },
  },
});
