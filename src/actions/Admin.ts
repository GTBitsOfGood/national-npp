import { internalRequest } from "src/utils/requests";
import {
  HttpMethod,
  Nonprofit,
  Chapter,
  User,
  AdminGetChapterContacts,
} from "src/utils/types";
import urls from "src/utils/urls";

const adminAPI = urls.baseUrl + urls.api.admin;

export async function adminGetNonprofits() {
  return internalRequest<Nonprofit[]>({
    url: adminAPI + "/nonprofits",
    method: HttpMethod.GET,
  });
}

export async function adminGetChapters() {
  return internalRequest<Chapter[]>({
    url: adminAPI + "/chapters",
    method: HttpMethod.GET,
  });
}

export async function adminGetChapterContacts(
  getChapterContacts: AdminGetChapterContacts
) {
  return internalRequest<User[]>({
    url: adminAPI + "/contacts",
    method: HttpMethod.GET,
    queryParams: { ...getChapterContacts },
  });
}
