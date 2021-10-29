import { Types } from "mongoose";
import { nonprofitUpdateNonprofit } from "server/mongodb/actions/Nonprofit";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitUpdateNonprofit, Role } from "src/utils/types";

export default APIWrapper({
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_ADMIN],
    },
    handler: async (req) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const nonprofitUpdate = req.body
        .nonprofitUpdate as NonprofitUpdateNonprofit;
      if (nonprofitUpdate.contact) {
        nonprofitUpdate.contact = Types.ObjectId(
          nonprofitUpdate.contact.toString()
        );
      }

      const nonprofit = await nonprofitUpdateNonprofit(
        nonprofitId,
        nonprofitUpdate
      );

      return nonprofit;
    },
  },
});
