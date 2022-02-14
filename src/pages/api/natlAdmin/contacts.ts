import { natlAdminGetChapterContacts } from "server/mongodb/actions/NatlAdmin";
import APIWrapper from "server/utils/APIWrapper";
import { User, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    },
    handler: async (req) => {
      const contacts: User[] = await natlAdminGetChapterContacts();

      if (!contacts) {
        throw new Error("Failed to retrieve contacts.");
      }

      return contacts;
    },
  },
});
