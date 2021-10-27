import { Types } from "mongoose";
import { createNonprofitApplication } from "server/mongodb/actions/Application";
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
});
