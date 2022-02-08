import { adminGetChapters } from "server/mongodb/actions/Admin";
import APIWrapper from "server/utils/APIWrapper";
import { Chapter, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    },
    handler: async () => {
      const chapters: Chapter[] = await adminGetChapters();

      if (!chapters) {
        throw new Error("Failed to retrieve chapters.");
      }

      return chapters;
    },
  },
});
