import { internalRequest } from "src/utils/requests";
import {
    HttpMethod,
    Nonprofit,
    Chapter,
    User,
} from "src/utils/types";
import urls from "src/utils/urls";

const adminAPI = urls.baseUrl + urls.api.admin;

export async function adminGetNonprofits() {
    return internalRequest<Nonprofit[]>({
        url: adminAPI + "/nonprofit",
        method: HttpMethod.GET,
    });
}

export async function adminGetChapters() {
    return internalRequest<Chapter[]>({
        url: adminAPI + `/chapter`,
        method: HttpMethod.GET,
    });
}

export async function adminGetChapterContacts() {
    return internalRequest<User[]>({
        url: adminAPI + '/contacts',
        method: HttpMethod.GET
    });
}
