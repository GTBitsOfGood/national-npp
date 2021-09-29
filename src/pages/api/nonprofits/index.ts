import {
  createNonprofit,
  getNonprofit,
  updateNonprofit,
} from "server/mongodb/actions/Nonprofit";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitCreate, NonprofitUpdate, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER, Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const user = req.user;
      const action = req.query.action;

      if (action == "profile") {
        const nonprofitId = user.nonprofit;

        if (!nonprofitId) {
          throw new Error("User does not belong to a nonprofit.");
        }

        const nonprofit = await getNonprofit(nonprofitId);
        return nonprofit;
      } else {
        throw new Error("Unknown action.");
      }
    },
  },
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
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const user = req.user;
      const action = req.query.action;

      if (action == "profile") {
        const nonprofitId = user.nonprofit;

        if (!nonprofitId) {
          throw new Error("User does not belong to a nonprofit.");
        }

        const nonprofitUpdate = req.body.nonprofitUpdate as NonprofitUpdate;

        const nonprofit = await updateNonprofit(nonprofitId, nonprofitUpdate);
        return nonprofit;
      } else {
        throw new Error("Unknown action.");
      }
    },
  },
});
