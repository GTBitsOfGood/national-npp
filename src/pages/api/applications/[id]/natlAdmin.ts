import { natlAdminChangeApplicationStage } from "server/mongodb/actions/Application";
import APIWrapper from "server/utils/APIWrapper";
import { ProjectStage, Role } from "src/utils/types";

export default APIWrapper({
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    },
    handler: async (req) => {
      const applicationId = req.query.id as string;

      // ensure valid project stage
      if (
        !Object.values(ProjectStage).some(
          (s: string) => s === (req.body.stage as string)
        )
      ) {
        throw new Error("Received invalid stage.");
      }

      const stage: ProjectStage = req.body.stage as ProjectStage;
      return natlAdminChangeApplicationStage({ applicationId, stage });
    },
  },
});
