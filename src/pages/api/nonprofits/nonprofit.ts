import { nonprofitCreateNonprofit } from "server/mongodb/actions/Nonprofit";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitCreateNonprofit, Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const nonprofitCreate = req.body
        .nonprofitCreate as NonprofitCreateNonprofit;

      const nonprofit = await nonprofitCreateNonprofit(nonprofitCreate);
      return nonprofit;
    },
  },
});
