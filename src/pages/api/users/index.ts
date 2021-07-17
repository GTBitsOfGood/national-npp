import {
  getChapterUserProfile,
  getNonprofitUserProfile,
} from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "chapter") {
        const userId = req.user?.id;

        const chapter = await getChapterUserProfile(userId);
        return chapter;
      } else if (action == "nonprofit") {
        const userId = req.user?.id;

        const nonprofit = await getNonprofitUserProfile(userId);
        return nonprofit;
      }
    },
  },
});
