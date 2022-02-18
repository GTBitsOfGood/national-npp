import { Email } from "src/utils/types";

// StatusEmail is an example template
export class NatlAdminEmailPOC implements Email {
    readonly templateName = "natl-admin-poc";

    constructor(
        public readonly data: { name: string; content: string; subject: string; }
    ) { }
}