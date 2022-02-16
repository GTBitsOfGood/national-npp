import { natlAdminGetNonprofits } from "server/mongodb/actions/NatlAdmin";
import APIWrapper from "server/utils/APIWrapper";
import { Nonprofit, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    },
    handler: async () => {
      const nonprofits: Nonprofit[] = await natlAdminGetNonprofits();

      if (!nonprofits) {
        throw new Error("Failed to retrieve nonprofits.");
      }

      return nonprofits;
    },
  },
});
