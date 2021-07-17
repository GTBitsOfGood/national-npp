import { Types } from "mongoose";
import {
  createNonprofit,
  updateNonprofit,
} from "server/mongodb/actions/Nonprofit";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitChange, Role } from "src/utils/types";

export default APIWrapper({
  POST: {
    config: {
      requireSession: false,
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "create") {
        const nonprofitInfo = req.body as NonprofitChange;

        if (!nonprofitInfo) {
          throw new Error("Not enough data provided to create a nonprofit");
        }

        const nonprofit = await createNonprofit(nonprofitInfo);
        return nonprofit;
      }
    },
  },
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "update") {
        const nonprofitId = req.user?.nonprofit;
        const partialNonprofitUpdate = req.body as NonprofitChange;

        if (!nonprofitId) {
          throw new Error("User is missing nonprofit.");
        }

        if (!partialNonprofitUpdate) {
          throw new Error("Missing updated nonprofit info.");
        }

        const update = await updateNonprofit(
          nonprofitId,
          partialNonprofitUpdate
        );
        return update;
      }
    },
  },
});
