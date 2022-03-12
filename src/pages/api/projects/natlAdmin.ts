import { natlAdminGetProjects } from "server/mongodb/actions/NatlAdmin";
import APIWrapper from "server/utils/APIWrapper";
import { Project, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    },
    handler: async () => {
      const projects: Project[] = await natlAdminGetProjects();

      if (!projects) {
        throw new Error("Failed to retrieve projects.");
      }

      return projects;
    },
  },
});
