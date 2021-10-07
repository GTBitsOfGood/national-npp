import { getNonprofitUsers } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const nonprofitId = req.user.nonprofit;

      if (!nonprofitId) {
        throw new Error("User does not belong to a nonprofit.");
      }

      const users = await getNonprofitUsers(nonprofitId);
      return users;
    },
  },
});
