import {
  getNonprofitUser,
  updateNonprofitUser,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { Role, UserUpdate } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [
        Role.NONPROFIT_MEMBER,
      ]
    },
    handler: async (req) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const user = await getNonprofitUser(req.user.id);
      return user;
    },
  },
  PATCH: {
    config: {
      requireSession: true,
      roles: [
        Role.NONPROFIT_MEMBER,
      ]
    },
    handler: async (req) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const userUpdate = req.body.userUpdate as UserUpdate;

      const user = await updateNonprofitUser(req.user.id, userUpdate);
      return user;
    },
  },
});
