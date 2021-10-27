import { getProjects } from "server/mongodb/actions/Project";
import APIWrapper from "server/utils/APIWrapper";
import { ProjectGet, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.CHAPTER_ADMIN],
    },
    handler: async (req) => {
      const projectGet = { ...req.query } as ProjectGet;

      const projects = await getProjects(projectGet);
      return projects;
    },
  },
});
