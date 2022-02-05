import { NonprofitRemovalEmail } from "emails/templates/nonprofit-removal/NonprofitRemovalEmail";
import { Types } from "mongoose";
import {
  adminDeleteNonprofit,
  adminGetNonprofit,
} from "server/mongodb/actions/Nonprofit";
import APIWrapper from "server/utils/APIWrapper";
import { sendEmail } from "server/utils/email";
import { Role, User } from "src/utils/types";

export default APIWrapper({
  DELETE: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    },
    handler: async (req) => {
      const reason = req.body.reason as string;
      if (!reason) {
        throw new Error("Must specify a reason");
      }

      const nonprofitId = Types.ObjectId(req.query.id as string);
      const nonprofit = await adminGetNonprofit(
        Types.ObjectId(req.query.id as string)
      );
      if (!nonprofit) {
        throw new Error("Nonprofit does not exist");
      }

      await adminDeleteNonprofit({
        deletedDocumentId: nonprofitId,
        name: nonprofit.name,
        reason: reason,
      });

      const { name, email } = nonprofit.contact as User;
      void sendEmail(
        email,
        new NonprofitRemovalEmail({
          name: name,
          nonprofitName: nonprofit.name,
          reason: reason,
        })
      );
    },
  },
});
