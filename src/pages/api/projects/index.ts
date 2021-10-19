import { getProjects } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { ProjectStage } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const applicationStatus = req.query.status;

      if (!applicationStatus) {
        throw new Error("No Application Status Specified");
      }
      const projects = await getProjects((applicationStatus as ProjectStage));
      return projects;
    },
  },
});
