import { Types } from "mongoose";
import { nonprofitCreateApplication } from "server/mongodb/actions/Application";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitCreateApplication, Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const applicationCreate = req.body
        .applicationCreate as NonprofitCreateApplication;
      const projectId = req.body.projectId as string;

      const application = await nonprofitCreateApplication(
        Types.ObjectId(projectId),
        applicationCreate
      );

      return application;
    },
  },
});
