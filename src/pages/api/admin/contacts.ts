import { } from "server/mongodb/actions/User";
import APIWrapper from "server/utils/APIWrapper";
import { User, Role } from "src/utils/types";

export default APIWrapper({
    GET: {
        config: {
            requireSession: true,
            roles: [Role.NATIONAL_ADMIN],
        },
        handler: async (req) => {
            // Mongo Query Here
            const contacts: User[] = [];
            return contacts;
        },
    },
});
