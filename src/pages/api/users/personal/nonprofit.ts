import {
  nonprofitGetUser,
  nonprofitUpdateUser,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { NonprofitUpdateUser, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
    },
    handler: async (req) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const user = await nonprofitGetUser(req.user.id);
      return user;
    },
  },
  PATCH: {
    config: {
      requireSession: true,
      roles: [Role.NONPROFIT_MEMBER],
    },
    handler: async (req) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const userUpdate = req.body.userUpdate as NonprofitUpdateUser;

      const user = await nonprofitUpdateUser(req.user.id, userUpdate);
      return user;
    },
  },
});
