import { createNonprofit } from "server/mongodb/actions/Nonprofit";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitCreate, Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const nonprofitCreate = req.body.nonprofitCreate as NonprofitCreate;

      const nonprofit = await createNonprofit(nonprofitCreate);
      return nonprofit;
    },
  },
});
