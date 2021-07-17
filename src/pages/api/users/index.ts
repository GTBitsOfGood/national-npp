import {
  getChapterUserProfile,
  getNonprofitUserProfile,
  updateUserProfile,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { UserChange } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "chapter") {
        const userId = req.user?.id;

        if (!userId) {
          throw new Error("User is missing.");
        }

        const chapter = await getChapterUserProfile(userId);
        return chapter;
      } else if (action == "nonprofit") {
        const userId = req.user?.id;

        if (!userId) {
          throw new Error("User is missing.");
        }

        const nonprofit = await getNonprofitUserProfile(userId);
        return nonprofit;
      }
    },
  },
  PATCH: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "update") {
        const userId = req.user?.id;
        const partialUserUpdate = req.body as UserChange;

        if (!userId) {
          throw new Error("User is missing.");
        }

        if (!partialUserUpdate) {
          throw new Error("Missing updated user info.");
        }

        const update = await updateUserProfile(userId, partialUserUpdate);
        return update;
      }
    },
  },
});
