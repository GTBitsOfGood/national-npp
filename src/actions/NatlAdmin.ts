import { internalRequest } from "src/utils/requests";
import { HttpMethod, Nonprofit, Chapter, User } from "src/utils/types";
import urls from "src/utils/urls";

const nonprofitAPI = urls.baseUrl + urls.api.nonprofits;
const chapterAPI = urls.baseUrl + urls.api.chapters;
const pocAPI = urls.baseUrl + urls.api.users;

export async function natlAdminGetNonprofits() {
  return internalRequest<Nonprofit[]>({
    url: nonprofitAPI + "/natlAdmin",
    method: HttpMethod.GET,
  });
}

export async function natlAdminGetChapters() {
  return internalRequest<Chapter[]>({
    url: chapterAPI + "/natlAdmin",
    method: HttpMethod.GET,
  });
}

export async function natlAdminGetChapterContacts() {
  return internalRequest<User[]>({
    url: pocAPI + "/natlAdmin",
    method: HttpMethod.GET,
  });
}

export async function natlAdminSendEmailChapterContacts(
  subject: string,
  content: string
) {
  return internalRequest({
    url: pocAPI + "/natlAdmin",
    method: HttpMethod.POST,
    body: {
      subject: subject,
      content: content
    }
  });
}
