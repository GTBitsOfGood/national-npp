import { adminGetNonprofits } from "server/mongodb/actions/Nonprofit";
import APIWrapper from "server/utils/APIWrapper";
import { Nonprofit, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    },
    handler: async () => {
      const nonprofits: Nonprofit[] = await adminGetNonprofits();

      if (!nonprofits) {
        throw new Error("Failed to retrieve nonprofits.");
      }

      return nonprofits;
    },
  },
});
