import { internalRequest } from "src/utils/requests";
import {
    HttpMethod,
    Nonprofit,
    Project
} from "src/utils/types";
import urls from "src/utils/urls";

const nonprofitAPI = urls.baseUrl + urls.api.nonprofits;
const chapterAPI = urls.baseUrl + urls.api.chapters;

export async function adminGetNonprofits() {
    return internalRequest<Nonprofit[]>({
        url: nonprofitAPI + "/admin",
        method: HttpMethod.GET,
    });
}

export async function adminGetChapters() {
    return internalRequest<Project[]>({
        url: chapterAPI + `/admin`,
        method: HttpMethod.GET,
    });
}
