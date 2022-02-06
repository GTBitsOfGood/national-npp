import { } from "server/mongodb/actions/Nonprofit";
import APIWrapper from "server/utils/APIWrapper";
import { Chapter, Role } from "src/utils/types";

export default APIWrapper({
    GET: {
        config: {
            requireSession: true,
            roles: [Role.NATIONAL_ADMIN],
        },
        handler: async (req) => {
            // Mongo Query Here
            const projects: Chapter[] = [];
            return projects;
        },
    },
});
