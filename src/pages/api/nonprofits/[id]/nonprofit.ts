import { Types } from "mongoose";
import { updateNonprofit } from "server/mongodb/actions/Nonprofit";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitUpdate, Role } from "src/utils/types";

export default APIWrapper({
  PATCH: {
    config: {
      requireSession: true,
      roles: [
        Role.NONPROFIT_ADMIN
      ]
    },
    handler: async (req) => {
      const claimedNonprofitId = req.query.id as string;
      const nonprofitId = req.user.nonprofit;

      if (Types.ObjectId(claimedNonprofitId) != nonprofitId) {
        throw new Error(
          "Users cannot update nonprofits that they do not belong to."
        );
      }

      const nonprofitUpdate = req.body.nonprofitUpdate as NonprofitUpdate;
      if (nonprofitUpdate.contact) {
        nonprofitUpdate.contact = Types.ObjectId(
          nonprofitUpdate.contact.toString()
        );
      }

      const nonprofit = await updateNonprofit(nonprofitId, nonprofitUpdate);
      return nonprofit;
    },
  },
});
