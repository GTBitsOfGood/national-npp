import { getChapters } from "server/mongodb/actions/Chapter";
import APIWrapper from "server/utils/APIWrapper";

export default APIWrapper({
  GET: {
    config: {
      requireSession: false,
    },
    handler: async (req) => {
      const action = req.query.action;

      if (action == "chapters") {
        const chapters = await getChapters();
        return chapters;
      }
    },
  },
});
