import { internalRequest } from "src/utils/requests";
import {
  HttpMethod,
  Nonprofit,
  Chapter,
  User,
} from "src/utils/types";
import urls from "src/utils/urls";

const adminAPI = urls.baseUrl + urls.api.natlAdmin;

export async function natlAdminGetNonprofits() {
  return internalRequest<Nonprofit[]>({
    url: adminAPI + "/nonprofits",
    method: HttpMethod.GET,
  });
}

export async function natlAdminGetChapters() {
  return internalRequest<Chapter[]>({
    url: adminAPI + "/chapters",
    method: HttpMethod.GET,
  });
}

export async function natlAdminGetChapterContacts(
) {
  return internalRequest<User[]>({
    url: adminAPI + "/contacts",
    method: HttpMethod.GET,
  });
}
